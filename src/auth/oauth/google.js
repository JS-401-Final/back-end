'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');
const querystring = require('querystring');
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const {google} = require('googleapis');

/**
 * Retrieves a session token for a user associated with the authorizing Google
 * profile. This creates a user model in the database if one doesn't exist.
 * @param request
 * @returns {Promise}
 */
const authorize = (request) => {
  const googleData = {
    code: request.query.code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.API_URL}/oauth`,
    grant_type: 'authorization_code',
  };
  console.log('this is googleData, ', googleData);
  // STEP 1: POST request for access token  
  return superagent.post('https://oauth2.googleapis.com/token')
    .type('form')
    .send(googleData)

    // STEP 2: GET request for Google user data
    .then((response) => {
      // this actually needs to me just /people/me
      // and you need to select the user email and id so we can create the 
      // user in prismawhatever

      const token = response.body.access_token;
      return superagent.get('https://people.googleapis.com/v1/people/me')
        .query({personFields: 'names,emailAddresses'})
        .set('Authorization', `Bearer ${token}`);

      // This query gets all contacts
      // return superagent.get('https://people.googleapis.com/v1/people/me/connections')
      //   .query({personFields: 'names,emailAddresses'})
      //   .set('Authorization', `Bearer ${token}`);
    })

    // STEP 3: Retrieve user from database
    .then((response) => {
      console.log('response dot BOOOOOOOODY is ', response.body);
      
      
      // This works when we do people/me/connections
      // to get a list of people with name/email
      // const peeps = response.body.connections.map(connection => { 
      //   return {
      //     name: connection.names[0].displayName,
      //     email: connection.emailAddresses ? connection.emailAddresses[0].value : null,
      //   };
      // });
      // console.log(peeps);

      const userData = {
        userName: response.body.names[0].displayName,
        email: response.body.emailAddresses[0].value,
        // nobody wanted that id: response.body.resourceName,
      };
      return userFromOauth(userData);
    })

    // STEP 4: Generate session token
    .then((user) => {
      request.user = user;
      return Users.generateToken(user);
    });
};

const userFromOauth = (userData) => {
  return prisma.user({email: userData.email})
    .then((user) => {
      if (!user) {
        return prisma.createUser(userData);
      }
      return user;
    });
};

module.exports = {authorize};
