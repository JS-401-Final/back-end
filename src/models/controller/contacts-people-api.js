'use strict';

const superagent = require('superagent');
const cookieParser = require('cookie-parser');
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const jwt = require('jsonwebtoken');

const fetchContacts = (request, response) => {

  // So here we can take the token from the cookies, it will be in the cookies
  const signed_token = request.cookies['X-401d19-OAuth-token'];
  const token = jwt.verify(signed_token, process.env.SECRET);
  const googleToken = token.googleToken;

  // This query gets all contacts
  return superagent.get('https://people.googleapis.com/v1/people/me/connections')
    .query({personFields: 'names,emailAddresses'})
    .set('Authorization', `Bearer ${googleToken}`)

    // STEP 3: Retrieve user from database
    .then((googleResponse) => {
    console.log('googleResponse dot BODY is ', googleResponse.body);
  
  
  // This works when we do people/me/connections
  // to get a list of people with name/email
  const peeps = googleResponse.body.connections.map(connection => { 
    return {
      name: connection.names[0].displayName,
      email: connection.emailAddresses ? connection.emailAddresses[0].value : null,
    };
  });
  console.log(peeps);
  response.json(peeps);

  // *******************************return - call a function that will create entries into the DB from the fetched data.********************************
  })
};

module.exports = fetchContacts;
