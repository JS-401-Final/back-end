'use strict';
/**
 * @module router/cases
 * @requires express
 */

const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

/**
 * This function creates a new case in the database
 * @function POST
 * @param {string} path - Express Path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - the newly created case object
 */
router.post('/case', async (req, res) => {
  const newCase = await prisma.createCase(req.body);
  res.json(newCase);
});

/**
 * This function gets all case data from database
 * @function GET
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Array | Error) } - an array of all cases
 */
router.get('/cases', async (req, res) => {
  // const retrievedCase = await prisma.cases();
  // res.json(retrievedCase);

  const retrievedCase = await prisma.cases().$fragment(getCaseByIdFragment);
  res.json(retrievedCase);
});

/**
 * This function gets a case from database
 * @function GET/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single case object
 */
router.get('/case/:id', async (req, res) => {
  const retrievedCase = await prisma.cases({
    where: {
      id: req.params.id,
    },
  }).$fragment(getCaseByIdFragment);

  res.json(retrievedCase);
});

/**
 * This function gets a case from database
 * @function PATCH/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single case object that was created
 */
router.patch('/case/:id', async (req, res) => {
  const updatedCase = await prisma.updateCase({
    data: req.body,
    where: {
      id : req.params.id,
    },
  }).$fragment(getCaseByIdFragment);

  res.json(updatedCase);
});


const getCaseByIdFragment = `
fragment CaseWithContacts on Case {
  id
  caseId
  title
  status
  referralType
  legalPlan
  importantDates {
    id
  }
  caseNumberDetails
  generalCaseDetails
  caseContacts {
    id
    firstName
    lastName
  }
  client {
    id
    firstName
    lastName
  }
  staffAttorneys {
    id
    firstName
    lastName
  }
  staffAssistants {
    id
    firstName
    lastName
  }
  opposingParties {
    id
    firstName
    lastName
  }
  opposingAttorneys {
    id
    firstName
    lastName
  }
  referringParties {
    id
    firstName
    lastName
  }
  associatedContacts {
    id
    firstName
    lastName
  }
  caseNotes {
    id
    dateCreated
    title
    author {
      userName
    }
  }
}
`;

// router.post('/caseContactsNotes', async (req, res) => {
//   const newCase = await prisma.createCase(req.body.case);
//   const newContact = await prisma.createContact(req.body.contact);
//   const newNote = await prisma.createNote(req.body.note);
//   res.json(newCase, newContact, newNote);
// });

module.exports = router;