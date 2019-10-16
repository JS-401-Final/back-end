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
      const { userName, id } = req.body.user;
      console.log(userName, id);
      res.cookie('X-401d19-OAuth-token', token);
      res.cookie('userName', userName);
      res.cookie('userID', id);
      res.redirect(301, process.env.CLIENT_URL);
    })
    .catch(next);
});

module.exports = authRouter;
