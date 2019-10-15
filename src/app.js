'use strict';

const express = require('express');
const cors = require('cors');
const { prisma } = require('../prisma-database/generated/prisma-client');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.post('/user', async (req, res) => {
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
});

app.get('/users', async (req, res) => {
  const users = await prisma.users();
  res.json(users);
});

app.get('/user/:id', async (req, res) => {
  const user = await prisma.user({id: req.params.id});
  res.json(user);
});

app.post('/note', async (req, res) => {
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
});

app.get('/notes', async (req, res) => {
  const notes = await prisma.notes();
  res.json(notes);
});

app.post('/case', async (req, res) => {
  const newCase = await prisma.createCase(req.body);
  res.json(newCase);
});

app.get('/cases', async (req, res) => {
  const cases = await prisma.cases();
  res.json(cases);
});


app.post('/contact', async (req, res) => {
  const newContactInfo = await prisma.createContact(req.body);
  res.json(newContactInfo);
});

app.get('/contacts', async (req, res) => {
  const contacts = await prisma.contacts();
  res.json(contacts);
});



module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};