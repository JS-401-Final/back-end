'use strict';
const jwt = require('jsonwebtoken');
const prisma = {
  user: ({id: id}) => {
    return ;
  },
};

const users = [
  {
    id: 1,
    firstName: 'Jane',
    lastName: 'Doe',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Smith',
  },
];

describe('Users Model', () => {
  test('Generate Token', () => {
    
  });
  test('Test unauthorized access', () => {
    superagent.post('http://localhost:4000/contact')
      .send({firstName: 'Jane',lastName: 'Doe'})
      .then( response => {
        expect(response.status).toBe(500);
      })
      .catch( error => {
        return error;
      });

  });
});
