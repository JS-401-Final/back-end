'use strict';

require('dotenv').config();
const server = require('./src/app');

server.start(process.env.PORT);
