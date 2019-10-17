'use strict';

/**
 * Authentication Middleware
 * @module src/auth/middleware
 */

const User = require('./users-model.js');

module.exports = (req, res, next) => {

  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);
    switch( authType.toLowerCase() ) {
    case 'bearer':
      return _authBearer(authString);
    default:
      return _authError();
    }
  }
  catch(e) {
    next(e);
  }

  /**
   *checks the jwt token
   * @param authString
   * @returns {Promise<void>}
   * @private
   */
  function _authBearer(authString){
    return User.authenticateToken(authString)
      .then( (user) => {
        return _authenticate(user);
      } )
      .catch(next);
  }

  /**
   *if the user exists, creates a token
   * @param user
   * @private
   */
  function _authenticate(user) {
    if(user) {
      req.user = user;
      req.token = User.generateToken(user);
      next();
    }
    else {
      _authError();
    }
  }

  /**
   *throws an error if the auth is invalid
   * @private
   */
  function _authError() {
    next('Invalid User ID/Password');
  }

};