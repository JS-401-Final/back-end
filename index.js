'use strict';

const server = require('./src/app');
require('dotenv').config();

server.start(4000);