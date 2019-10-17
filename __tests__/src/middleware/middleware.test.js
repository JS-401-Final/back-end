'use strict';
const superagent = require('superagent');

describe('Error Handling for routes', () => {
  test('Test invalid route', () => {
    superagent.get('http://localhost:4000/testRoute')
      .then( response => {
        expect(response.status).toBe(400);
      })
      .catch( error => {
        return error;
      });
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
