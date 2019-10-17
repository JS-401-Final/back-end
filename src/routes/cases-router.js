'use strict';

const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

//// ====== CASE Routes ======

router.post('/case', async (req, res) => {
  const newCase = await prisma.createCase(req.body);
  res.json(newCase);
});

router.get('/cases', async (req, res) => {
  const retrievedCase = await prisma.cases();
  res.json(retrievedCase);
});


router.get('/case/:id', async (req, res) => {
  const retrievedCase = await prisma.cases({
    where: {
      id: req.params.id,
    },
  }).$fragment(getCaseByIdFragment);

  res.json(retrievedCase);
});


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