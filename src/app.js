'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const handleError = require('./middleware/error');
const handle404 = require('./middleware/404');

// Prepare the express app
const app = express();
const authRouter = require('./auth/router');


// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(authRouter);

app.use(handle404);
app.use(handleError);


module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};