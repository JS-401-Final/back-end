'use strict';

const caseRouter = require('../src/routes/cases-router')
const { prisma } = require('../../../prisma-database/generated/prisma-client');
process.env.TOKEN_EXPIRE_TIME = '24h';
process.env.SECRET = 'testsecret';




describe('Dummy test', () => {
  test('Test test!', () => {
    
  });
});


const prisma = {}
prisma.user = jest.fn();
prisma.$exists.user = jest.fn();
prisma.createUser = jest.fn();
context = {
    prisma
}
const res = graphql(schema, MUTATION, null, context)

const prisma = new Prisma({
  endpoint: '',
});
prisma.user = jest.fn();
prisma.$exists.user = jest.fn();
prisma.createUser = jest.fn();
context = {
    prisma
}
const res = graphql(schema, MUTATION, null, context)