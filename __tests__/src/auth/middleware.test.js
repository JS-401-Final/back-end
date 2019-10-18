'use strict';

const middleware = require('../../../src/auth/middleware');

process.env.TOKEN_EXPIRE_TIME = '24h';
process.env.SECRET = 'testsecret';
const User = require('../../../src/auth/users-model');
const { prisma } = require('../../../prisma-database/generated/prisma-client');

const rootDir = process.cwd();
const { server } = require(`${rootDir}/src/app.js`);
const supertest = require('supertest')(server);

const users = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Doe',
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Smith',
  },
];

prisma.user = jest.fn((query) => {
  return users.filter((user) => user.id === query.id)[0];
});

describe('Auth Middleware', () => {

  test('It should return a user with bearer auth', () => {
    
  });

});
