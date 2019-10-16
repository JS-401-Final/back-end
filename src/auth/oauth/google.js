'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');
const { prisma } = require('../../../prisma-database/generated/prisma-client');

async function createUserInDatabase (userData){
  const newUser = await prisma.createUser(userData);
  console.log(newUser);
}
  

const authorize = (req) => {

  let code = req.query.code;
  // console.log('(1) CODE:', code);

  return superagent.post('https://oauth2.googleapis.com/token')
    .type('form')
    .send({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth`,
      grant_type: 'authorization_code',
    })
    .then( response => {
      let access_token = response.body.access_token;
      // console.log('(2) ACCESS TOKEN:', access_token);
      return access_token;
    })
    .then(token => {
      return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
        .set('Authorization', `Bearer ${token}`)
        .then( response => {
          let user = response.body;
          user.access_token = token;
          console.log('(3) GOOGLEUSER', user);
          return user;
        });
    })
    .then(oauthUser => {
      console.log('(4) CREATE ACCOUNT', oauthUser);
      let userData = {
        userName: oauthUser.name,
        email: oauthUser.email,
      };
      return prisma.user({email: oauthUser.email})
        .then(user => {
          if(user){
            return Users.generateToken();
          } else {
            return createUserInDatabase(userData)
              .then(newUser => Users.generateToken());
          }
        });
    })
    .catch(error => error);


};

module.exports = {authorize};
