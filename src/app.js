'use strict';
/**
 * @module
 */

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const handleError = require('./middleware/error');
const handle404 = require('./middleware/404');

const casesRouter = require('./routes/cases-router');
const contactsRouter = require('./routes/contacts-router');
const notesRouter = require('./routes/notes-router');
const usersRouter = require('./routes/users-router');
const authRouter = require('./auth/router');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation
// 
// If JSDOC_ROUTE environment variable is present, publish the jsdoc docs on that route.
if (process.env.JSDOC_ROUTE) {
  app.use(process.env.JSDOC_ROUTE, express.static('./docs/'));
}

// Routes
app.use(casesRouter);
app.use(contactsRouter);
app.use(notesRouter);
app.use(usersRouter);
app.use(authRouter);

app.use(handle404);
app.use(handleError);

module.exports = {
  server: app,
  /**
   * Start Express server on the given port.
   * @param port
   */
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
