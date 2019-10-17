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
  const notes = await prisma.notes({
    where: {
      id: req.params.id,
    },
  }).$fragment(getNoteByIdFragment);

  res.json(notes);
});

router.get('/note/:id', async (req, res) => {
  // const note = await prisma.note({ id: req.params.id });
  // res.json(note);

  const note = await prisma.notes({
    where: {
      id: req.params.id,
    },
  }).$fragment(getNoteByIdFragment);

  res.json(note);
});

const getNoteByIdFragment = `
    fragment NotesWithAuthors on Notes {
      id
      dateCreated
      case {
        id
        caseId
      }
      title
      content
      author {
        userName
      }
      type
    }
`;

module.exports = router;