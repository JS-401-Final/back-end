'use strict';

const rootDir = process.cwd();
const { server } = require(`${rootDir}/src/app.js`);
const supertest = require('supertest')(server);



xdescribe('Error Handling for routes', () => {

  test('Test invalid route', () => {
    return supertest.get('/testRoute')
      .then( response => {
        expect(response.status).toBe(404);
      });
  });

  test('Test unauthorized access', () => {
    return supertest.post('/contact')
      .send({firstName: 'Jane',lastName: 'Doe'})
      .then( response => {
        expect(response.status).toBe(500);
      });
  });
});
