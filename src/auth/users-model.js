'use strict';

/**
 * User Model
 * @module src/auth/users-model
 */

const jwt = require('jsonwebtoken');

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
const generateToken = (user) => {

  let token = {
    id: user.id,
  };

  let signOptions = { expiresIn: process.env.TOKEN_EXPIRE_TIME};

  return jwt.sign(token, process.env.SECRET, signOptions);
};

module.exports = {};
module.exports.generateToken = generateToken;
