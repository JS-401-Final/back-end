'use strict';

process.env.TOKEN_EXPIRE_TIME = '24h';
process.env.SECRET = 'testsecret';
const User = require('../../../src/auth/users-model');
const { prisma } = require('../../../prisma-database/generated/prisma-client');

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

xdescribe('Users Model', () => {

  test('Authenticate Token', () => {
    const token = User.generateToken(users[1]);
    const user =  User.authenticateToken(token);
    expect(user).toEqual(users[1]);
  });

});
