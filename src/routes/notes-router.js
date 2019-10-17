'use strict';
/**
 * @module router/notes
 * @requires express
 */
const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

/**
 * This function creates a new note in the database
 * @function POST
 * @param {string} path - Express Path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - the newly created note object
 */
router.post('/note', async (req, res) => {
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
});

/**
 * This function gets all note data from database
 * @function GET
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Array | Error) } - an array of all notes
 */
router.get('/notes', async (req, res) => {
  const notes = await prisma.notes({
    where: {
      id: req.params.id,
    },
  }).$fragment(getNoteByIdFragment);

  res.json(notes);
});

/**
 * This function gets a note from database
 * @function GET/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single note object
 */
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