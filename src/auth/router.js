const oauth = require('../auth/oauth/google');
const express = require('express');
const authRouter = express.Router();

/**
 * Redirect after oauth
 * @route Get /oauth
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 */
authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then( token => {
      res.status(200).send(token);
    })
    .catch(next);
});

module.exports = authRouter;