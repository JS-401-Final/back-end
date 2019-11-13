'use strict';
/**
 * @module router/contacts
 * @requires express
 * @requires fuzzy-search
 */

const FuzzySearch = require('fuzzy-search');
const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');
const auth = require('../auth/middleware');
const people_api = require('../models/controller/contacts-people-api');

/**
 * This function creates a new contact in the database
 * @function POST
 * @param {string} path - Express Path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - the newly created contact object
 */
router.post('/contact', auth, async (req, res) => {
  const signed_token = req.cookies['X-401d19-OAuth-token'];
  console.log('=====> signed_token', signed_token);

  console.log('req.body ========> ', req.body);

  const newContact = await prisma.createContact(req.body);
  console.log('prisma newContact ========>', newContact);

  const googlePerson = await people_api.create(req, res);
  console.log('googlePerson  ========>', googlePerson);

  res.json(newContact);
});

/**
 * This function gets all constact data from database
 * @function GET
 * @example <caption>Example query string</caption>
 * localhost:4000/constact/?name=john
 * returns all constacts that have John in the first or last name fields
 * filtered and sorted by fuzzy search
 * @param {string} path - express path - *optional name query field
 * @param {function} callback - express callback
 * @returns { (Array | Error) } - an array of all constacts optionally filtered by 'name' query
 */
router.get('/contacts', auth, async (req, res) => {
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

/**
 * This function gets a contact from database
 * @function GET/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single contact object
 */
router.get('/contact/:id', auth, async (req, res) => {
  const contact = await prisma.contact({ id: req.params.id });
  res.json(contact);
});

router.get('/googleContacts', auth, people_api.fetch);
router.post('/importGoogleContacts', auth, people_api.import);

module.exports = router;
