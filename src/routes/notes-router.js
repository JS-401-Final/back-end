'use strict';

const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');


//// ====== NOTES Routes ======

router.post('/note', async (req, res) => {
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
});

router.get('/notes', async (req, res) => {
  const notes = await prisma.notes();
  res.json(notes);
});

router.get('/note/:id', async (req, res) => {
  const note = await prisma.note({ id: req.params.id });
  res.json(note);
});

module.exports = router;