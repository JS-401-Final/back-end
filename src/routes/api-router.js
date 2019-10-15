'use strict';

const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

router.post('/user', async (req, res) => {
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
});

router.get('/users', async (req, res) => {
  const users = await prisma.users();
  res.json(users);
});

router.get('/user/:id', async (req, res) => {
  const user = await prisma.user({id: req.params.id});
  res.json(user);
});

router.post('/note', async (req, res) => {
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
});

router.get('/notes', async (req, res) => {
  const notes = await prisma.notes();
  res.json(notes);
});

router.post('/case', async (req, res) => {
  const newCase = await prisma.createCase(req.body);
  res.json(newCase);
});

router.get('/cases', async (req, res) => {
  const cases = await prisma.cases();
  res.json(cases);
});


router.post('/contact', async (req, res) => {
  const newContact = await prisma.createContact(req.body);
  res.json(newContact);
});

router.get('/contacts', async (req, res) => {
  const contacts = await prisma.contacts();
  res.json(contacts);
});

// router.post('/caseContactsNotes', async (req, res) => {
//   const newCase = await prisma.createCase(req.body.case);
//   const newContact = await prisma.createContact(req.body.contact);
//   const newNote = await prisma.createNote(req.body.note);
//   res.json(newCase, newContact, newNote);
// });

module.exports = router;