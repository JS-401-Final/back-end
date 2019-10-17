'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');
const { prisma } = require('../../../prisma-database/generated/prisma-client');

/**
 * Retrieves a session token for a user associated with the authorizing Google
 * profile. This creates a user model in the database if one doesn't exist.
 * @param request
 * @returns {Promise}
 */
const authorize = (request) => {
  // STEP 1: POST request for access token
  return superagent.post('https://oauth2.googleapis.com/token')
    .type('form')
    .send({
      code: request.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth`,
      grant_type: 'authorization_code',
    })

    // STEP 2: GET request for Google user data
    .then((response) => {
      const token = response.body.access_token;
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`);
    })

    // STEP 3: Retrieve user from database
    .then((response) => {
      const userData = {
        userName: response.body.name,
        email: response.body.email,
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
