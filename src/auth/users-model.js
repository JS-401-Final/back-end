'use strict';

/**
 * User Model
 * @module src/auth/users-model
 */

const jwt = require('jsonwebtoken');

// TODO - REPLACE WITH USER MODEL FOR PRISMA
const usersSchema = {
  username: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  email: {type: String},
  role: {type: String, default:'user', enum: ['admin','editor','user']},
};


/**
 *
 * @param email
 * @returns {Promise<never>|Promise<unknown>}
 */
const createFromOauth = function(email) {

  if(! email) { return Promise.reject('Validation Error'); }

  return this.findOne( {email} )
    .then(user => {
      if( !user ) { throw new Error('User Not Found'); }
      console.log('Welcome Back', user.username);
      return user;
    })
    .catch( error => {
      console.log('Creating new user');
      let username = email;
      let password = 'none';
      return this.create({username, password, email});
    });

};

/**
 *
 * @param token
 * @returns {Promise<never>|void|Query}
 */
const authenticateToken = function(token) {
//TODO:: UPDATE TO FIND USER WITH PRISMA METHOD
  // try {
  //   let parsedToken = jwt.verify(token, process.env.SECRET);
  //   let query = {_id: parsedToken.id};
  //   return this.findOne(query);
  // } catch (error) {
  //   throw new Error('Invalid Token');
  // }
};

/**
 *
 * @param type
 * @returns {undefined|*}
 */
const generateToken = function(type) {

  let token = {
    id: this._id,
    role: this.role,
  };

  let signOptions = { expiresIn: process.env.TOKEN_EXPIRE_TIME};

  return jwt.sign(token, process.env.SECRET, signOptions);
};

module.exports = {};
module.exports.generateToken = generateToken;
