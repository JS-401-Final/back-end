'use strict';
/**
 * @module router/notes
 * @requires express
 */
const express = require('express');
const router = express.Router();
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const auth = require('../../auth/middleware');

/**
 * This function creates a new note in the database
 * @function POST
 * @param {string} path - Express Path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - the newly created note object
 */

async function handleNewNote(req, res){
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
}

/**
 * This function gets all note data from database
 * @function GET
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Array | Error) } - an array of all notes
 */

async function handleGetNoteDataDB(req, res){
  const notes = await prisma.notes({
    where: {
      id: req.params.id,
    },
  }).$fragment(getNoteByIdFragment);
  res.json(notes);
}

/**
 * This function gets a note from database
 * @function GET/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single note object
 */

async function handleGetNoteDB(req,res){
  const note = await prisma.notes({
    where: {
      id: req.params.id,
    },
  }).$fragment(getNoteByIdFragment);
  res.json(note);
}


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

module.exports = {
  handleNewNote,
  handleGetNoteDataDB,
  handleGetNoteDB,
};