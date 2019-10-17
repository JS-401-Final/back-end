'use strict';

const FuzzySearch = require('fuzzy-search');
const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');
const auth = require('../auth/middleware');

//// ====== CONTACT Routes ======

router.post('/contact', async (req, res) => {
  const newContact = await prisma.createContact(req.body);
  res.json(newContact);
});

router.get('/contacts', async (req, res) => {
  // if body has a search and name property set
  let nameToFilterBy = req.query && req.query.name;
  console.log(nameToFilterBy);
  // get all contacts
  const contacts = await prisma.contacts();
  // filter contacts by nameToFilterBy
  const searcher = new FuzzySearch(contacts, ['firstName', 'lastName'], {
    caseSensitive: false,
    sort: true,
  });
  const result = searcher.search(nameToFilterBy);
  // return filtered list of contacts
  res.json(result);
});

router.get('/contact/:id', async (req, res) => {
  const contact = await prisma.contact({ id: req.params.id });
  res.json(contact);
});

module.exports = router;