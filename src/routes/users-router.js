'use strict';

const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

//// ====== USER Routes ======

router.post('/user', async (req, res) => {
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
});

router.get('/users', async (req, res) => {
  const users = await prisma.users();
  res.json(users);
});

router.get('/user/:id', async (req, res) => {
  const user = await prisma.user({ id: req.params.id });
  res.json(user);
});

module.exports = router;