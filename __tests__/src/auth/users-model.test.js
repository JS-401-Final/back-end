'use strict';


process.env.TOKEN_EXPIRE_TIME = '24h';
process.env.SECRET = 'testsecret';
const User = require('../../../src/auth/users-model');
// const prisma = require('../../../prisma-database/generated/prisma-client').prisma;
//
// jest.mock('../../../prisma-database/generated/prisma-client');

// const prisma = {
//   user: (query) => {
//     for (let id in query){
//       for (let i = 0; i < users.length; i++){
//         if(query[id] === users[i].id){
//           return users[i];
//         }
//       }
//     }
//   },
// };

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


describe('Users Model', () => {

  test('Generate Token', () => {
    expect(User.generateToken(users[1])).toBeTruthy();
  });

  test('Authenticate Token', () => {
    // prisma.user.mockImplementation(() => Promise.resolve(users[1]));
    let token = User.generateToken(users[1]);
    console.log(token);
    let user =  User.authenticateToken(token);
    expect(user).toBeTruthy();
  });

});
