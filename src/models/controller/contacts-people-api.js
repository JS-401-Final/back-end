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
};

const importContactsRoute = async (request, response) => {
  const signed_token = request.cookies['X-401d19-OAuth-token'];
  const token = jwt.verify(signed_token, process.env.SECRET);
  const peeps = await fetchContacts(token.googleToken);
  const imported_peeps = await importContacts(peeps);
  // we're also going to save them to the database
  // we will get nulls if they already exist in the database
  // we don't want to show nulls, so we use filter
  response.json(imported_peeps.filter(x => x));
};

const postContactRoute = async (req, res) => {

  let [authType, authString] = req.headers.authorization.split(/\s+/);

  // const signed_token = req.cookies['X-401d19-OAuth-token'];
  const signed_token = authString;

  console.log('=====> signed_token', signed_token);
  const token = jwt.verify(signed_token, process.env.SECRET);
  console.log('=====> token', token);
  
  const givenName = req.body.firstName;
  const familyName = req.body.lastName;
  const phoneNumbers = [req.body.cellPhone, req.body.workPhone, req.body.homePhone];
  const emailAddresses = [req.body.emailMain, req.body.emailBackup]; // TODO:
  const person = await postContact(token.googleToken, givenName, emailAddresses, phoneNumbers);
  // res.json(person);
};

const importContacts = async (peeps) => {  
  // Let's do an array of creates, these are all promises
  const creates = peeps.map(peep => {
    return prisma.createContact(peep)
      .catch((err) => {
        console.log('Not creating contact (may already exist):', err);
      });
  });
  // await on all the creates
  return await Promise.all(creates);
};

const emptyIfNull = (val) => val ? val : '';

const fetchContacts = (googleToken) => {
  // This query gets all contacts
  return superagent.get('https://people.googleapis.com/v1/people/me/connections')
    .set('Authorization', `Bearer ${googleToken}`)
    .query({ personFields: 'names,emailAddresses' })
    .then(googleResponse => {
      console.log('googleResponse dot BODY is ', googleResponse.body);
      
      // This works when we do people/me/connections
      // to get a list of people with name/email
      const peeps = googleResponse.body.connections.map(connection => {
        return {
          id: Number(connection.resourceName.replace('people/c', '')),
          firstName: emptyIfNull(connection.names[0].givenName),
          lastName: emptyIfNull(connection.names[0].familyName),
          emailMain: emptyIfNull(connection.emailAddresses ? connection.emailAddresses[0].value : null),
        };
      });
      return peeps;
    })
    .catch(error => {
      console.log('Error fetching contacts', error);
    });
};

const postContact = (googleToken, givenName, emailAddresses, phoneNumbers) => {
  // This query gets all contacts
  return superagent.post('https://people.googleapis.com/v1/people:createContact')
    .set('Authorization', `Bearer ${googleToken}`)
    .send({
      'names': [{givenName}],
      'emailAddresses': [  {'value': 'testemail@gmail.com'} ],
      'phoneNumbers': [{'value': 'phone'}],
    })
    .then(googleResponse => {
      console.log('googleResponse dot BODY is ', googleResponse.body);

      const personId = googleResponse.body.resourceName;
      console.log('======> Person', personId);
      
      return personId;
    })
    .catch(error => {
      console.log('Error posting contacts', error);
    });
};

module.exports = {
  fetch: fetchContactsRoute,
  import: importContactsRoute,
  create: postContactRoute,
};
