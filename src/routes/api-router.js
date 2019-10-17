'use strict';

const FuzzySearch = require('fuzzy-search');
const express = require('express');
const router = express.Router();
const { prisma } = require('../../prisma-database/generated/prisma-client');

//// ====== USER Routes ======

router.post('/user', async (req, res) => {
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
});

router.get('/users', async (req, res) => {
  const users = await prisma.users();
  res.json(users);
});

router.get('/user/:id', async (req, res) => {
  const user = await prisma.user({ id: req.params.id });
  res.json(user);
});

//// ====== NOTES Routes ======

router.post('/note', async (req, res) => {
  const newNote = await prisma.createNote(req.body);
  res.json(newNote);
});

router.get('/notes', async (req, res) => {
  const notes = await prisma.notes()
    .then({
      
    });

  res.json(notes);
});


router.get('/note/:id', async (req, res) => {
  const note = await prisma.note({ id: req.params.id });
  res.json(note);
});


//// ====== CASE Routes ======

router.post('/case', async (req, res) => {
  const newCase = await prisma.createCase(req.body);
  res.json(newCase);
});

router.get('/cases', async (req, res) => {
  const cases = await prisma.cases();
  res.json(cases);
});


router.get('/case/:id', async (req, res) => {
  const retrievedCase = await prisma.cases({
    where: {
      caseId: req.params.id,
    },
  }).$fragment(getCaseByIdFragment);
  console.log(retrievedCase);
  res.json(retrievedCase);
});

router.patch('/case/:id', async (req, res) => {
  const updatedCase = await prisma.updateCase({
    data: req.body,
    where: {
      caseId : req.params.id,
    },
  }).$fragment(getCaseByIdFragment);
  res.json(updatedCase);
});

//// ====== CONTACT Routes ======

router.post('/contact', async (req, res) => {
  const newContact = await prisma.createContact(req.body);
  res.json(newContact);
});

router.get('/contacts', async (req, res) => {
  // if body has a search and name property set
  let nameToFilterBy = req.body.search && req.body.search.name;
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
  opposingPartys {
    id
    firstName
    lastName
  }
  opposingAttorneys {
    id
    firstName
    lastName
  }
  referringPartys {
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