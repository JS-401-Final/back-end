const oauth = require('../auth/oauth/google');
const express = require('express');
const authRouter = express.Router();

/**
 * Redirect after oauth
 * @route Get /oauth
 * @returns {object} 301 - Redirects to front-end client
 */
authRouter.get('/oauth', (req,res,next) => {
  oauth.authorize(req)
    .then((token) => {
      const { userName, id } = req.user;
      // This token is the result of users-model generateToken and it has both 
      // the id of the user and the googleToken
      res.cookie('X-401d19-OAuth-token', token);
      res.cookie('userName', userName);
      res.cookie('userID', id);
      res.redirect(301, process.env.CLIENT_URL);
      console.log
    })
    .catch((error) => {
      console.log(error);
      res.redirect(301, process.env.CLIENT_URL + '/error');
    });
});

module.exports = authRouter;
