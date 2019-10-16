'use strict';

/**
 * User Model
 * @module src/auth/users-model
 */

const jwt = require('jsonwebtoken');


/**
 *
 * @param email
 * @returns {Promise<never>|Promise<unknown>}
 */


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
