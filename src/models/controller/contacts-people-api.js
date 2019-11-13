'use strict';

const superagent = require('superagent');
const cookieParser = require('cookie-parser');
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const jwt = require('jsonwebtoken');

const fetchContactsRoute = async (request, response) => {
  const signed_token = request.cookies['X-401d19-OAuth-token'];
  const token = jwt.verify(signed_token, process.env.SECRET);
  const peeps = await fetchContacts(token.googleToken);
  response.json(peeps);
}

const importContactsRoute = async (request, response) => {
  const signed_token = request.cookies['X-401d19-OAuth-token'];
  const token = jwt.verify(signed_token, process.env.SECRET);
  const peeps = await fetchContacts(token.googleToken);
  const imported_peeps = await importContacts(peeps);
  // we're also going to save them to the database
  // we will get nulls if they already exist in the database
  // we don't want to show nulls, so we use filter
  response.json(imported_peeps.filter(x => x));
}

const importContacts = async (peeps) => {  
  // Let's do an array of creates, these are all promises
  const creates = peeps.map(peep => {
    return prisma.createContact(peep)
      .catch((err) => {
        console.log("Not creating contact (may already exist):", err);
      });
  });
  // await on all the creates
  return await Promise.all(creates);
}

const emptyIfNull = (val) => val ? val : '';

const fetchContacts = (googleToken) => {  
  // This query gets all contacts
  return superagent.get('https://people.googleapis.com/v1/people/me/connections')
    .set('Authorization', `Bearer ${googleToken}`)
    .query({personFields: 'names,emailAddresses'})
    .then(googleResponse => {
      console.log('googleResponse dot BODY is ', googleResponse.body);
      
      // This works when we do people/me/connections
      // to get a list of people with name/email
      const peeps = googleResponse.body.connections.map(connection => { 
        return {
          id:  Number(connection.resourceName.replace('people/c', '')),
          firstName: emptyIfNull(connection.names[0].givenName),
          lastName: emptyIfNull(connection.names[0].familyName) ,
          emailMain: emptyIfNull(connection.emailAddresses ? connection.emailAddresses[0].value : null),
        };
      });
      return peeps;
    })
    .catch(error => {
      console.log("Error fetching contacts",error);
    });
}

module.exports = {
  fetch: fetchContactsRoute,
  import: importContactsRoute,
}
