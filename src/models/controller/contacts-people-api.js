'use strict';

const superagent = require('superagent');
const cookieParser = require('cookie-parser');
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const jwt = require('jsonwebtoken');

/** 
* This function is used for both fetching the contacts, and also the function that 
* fetches and imports contacts to the database.
* @params {request}
* @returns {object} - the contacts from the People API
*/
const fetchContactsRoute = async (request, response) => {
  // alternatively, you can used the cookie line below as opposed to the authString, but cookies are not implemented on the front end as of now.
  // const signed_token = request.cookies['X-401d19-OAuth-token'];
  let [authType, authString] = request.headers.authorization.split(/\s+/);
  const signed_token = authString;
  const token = jwt.verify(signed_token, process.env.SECRET);
  const peeps = await fetchContacts(token.googleToken);
  response.json(peeps);
};

/**
* This function imports the fetched contacts into the prisma database
* @params {request}
* @returns {object} - the imported contacts
*/
const importContactsRoute = async (request, response) => {
  // alternatively, you can used the cookie line below as opposed to the authString, but cookies are not implemented on the front end as of now. 
  // const signed_token = request.cookies['X-401d19-OAuth-token'];
  let [authType, authString] = request.headers.authorization.split(/\s+/);
  const signed_token = authString;
  const token = jwt.verify(signed_token, process.env.SECRET);
  const peeps = await fetchContacts(token.googleToken);
  const imported_peeps = await importContacts(peeps);
  // we're also going to save them to the database
  // we will get nulls if they already exist in the database
  // we don't want to show nulls, so we use filter
  response.json(imported_peeps.filter(x => x));
};

/**
* This function will create a new contact in Google Contacts using the People API
* This will be done when a new contact is created using the /contact route
* Therefore, the contact info will be in the prisma database as well as Google Contacts.
* @params {object} - will contain the new contact entry
* @returns {} - nothing needed to be returned
*/
const postContactRoute = async (req, res) => {

  let [authType, authString] = req.headers.authorization.split(/\s+/);

  const signed_token = authString;

  const token = jwt.verify(signed_token, process.env.SECRET);
  
  const givenName = req.body.firstName;
  const familyName = req.body.lastName;
  const phoneNumbers = [req.body.cellPhone, req.body.workPhone, req.body.homePhone];
  const emailAddresses = [req.body.emailMain, req.body.emailBackup]; // TODO:
  const person = await postContact(token.googleToken, givenName, emailAddresses, phoneNumbers);
};

/** 
* This function imports the contact(s) fetched from google contacts using the People API
* @params {object} - peeps - The contact object we are importing to the database
* @returns {object} - returns all the new contacts we have imported into the database
*/
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

// This is to clear out null values --> we don't want to store nulls in the database
const emptyIfNull = (val) => val ? val : '';

/**
  * This function will fetch all of the user's contacts from the people API
  * @params {string} - googleToken
  * @returns {object} - contact object
*/
const fetchContacts = (googleToken) => {
  // This query gets all contacts
  // people/me/connections gets all of the contacts belonging to "me" (user)
  return superagent.get('https://people.googleapis.com/v1/people/me/connections')
    .set('Authorization', `Bearer ${googleToken}`)
    .query({ personFields: 'names,emailAddresses' })
    .then(googleResponse => {
      
      // This works when we do people/me/connections
      // to get a list of people with name/email
      // more data (personFields) per contact can be retrieved if desired - a full list can be found here: https://developers.google.com/people/api/rest/v1/people.connections/list
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

/**
 * This function will create a new contact in Google Contacts using the People API
 * This will be done when a new contact is created using the /contact route
 * @param {string} - googleToken, givenName, email Addresses, phoneNumbers
 * @returns {object} - new contact entry
*/
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
