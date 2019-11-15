'use strict';

// const middleware = require('../../../src/auth/middleware');
// const caseRouter = require('../src/routes/cases-router');
const rootDir = process.cwd();
const { prisma } = require('../prisma-database/generated/prisma-client');
const { server } = require(`${rootDir}/src/app.js`);
const supertest = require('supertest')(server);
const User = require('../src/auth/users-model');
process.env.TOKEN_EXPIRE_TIME = '24h';
process.env.SECRET = 'testsecret';

afterAll((done) => {
  // here we can remove data;
  done();
})

describe('GET /contacts', function () {
  it('respond with json containing a list of all users', async (done) => {
      const prismaUser = await prisma.createUser({userName: 'test'});
      const token = User.generateToken(prismaUser, 'aosdhfilaushf_2364987q2364978246');
      supertest.get('/contacts')
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('GET /contact/:id', function () {
  it('respond with json containing single user by id', async (done) => {
      const prismaUser = await prisma.createUser({userName: 'test'});
      const token = User.generateToken(prismaUser, 'aosdhfilaushf_2364987q2364978246');
      supertest.get(`/contact/${prismaUser.id}`)
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('POST /contact', function () {
  it('Will post a contact to the Prisma Database', async (done) => {
      const prismaUser = await prisma.createUser({userName: 'test2'});
      const token = User.generateToken(prismaUser, 'aosdhfilaushf_2364987q2364978246');
      const mockContact = {lastName: 'Test', firstName: 'User'}
      supertest.post(`/contact`)
      .send(mockContact)
      .set('Authorization', `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(200);
        done();
      });
  });
});


