const { prisma } = require('./generated/prisma-client');

async function createMockData() {

  await prisma.createUser({
    userName: 'Deploy name',
  });

  await prisma.createUser({
    email: 'alfred@email.com',
    userName: 'alfred',
    role: 'admin',
    contact: {
      create: {
        contactType: 'attorney',
        firstName: 'alred',
        lastName: 'alfy',
        homeStreet: '1233 alf lane',
        homeStreet2: 'App #5',
        homeCity: 'seattle',
        homeState: 'washington',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'App #5',
        emailMain: 'alfred@email.com',
        emailBackup: 'alred2@email.com',
        socialSecurity: 1453252435,
        cellPhone: 2056871237,
        workPhone: 2445678999,
        homePhone: 2345678996,
        fax: 8723904802,
        contactComment: 'this is a comment on the comment field of a contact',
      },
    },
  });
 
  await prisma.createUser({
    email: 'ben@email.com',
    userName: 'ben',
    role: 'ben',
    contact: {
      create: {
        contactType: 'attorney',
        firstName: 'ben',
        lastName: 'ben',
        homeStreet: '1233 ben lane',
        homeStreet2: 'App #5',
        homeCity: 'seattle',
        homeState: 'washington',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'App #5',
        emailMain: 'ben@email.com',
        emailBackup: 'ben2@email.com',
        socialSecurity: 145325,
        cellPhone: 2056871237,
        workPhone: 2345678999,
        homePhone: 2345678996,
        fax: 8723904802,
        contactComment: 'this is a comment on the comment field of a contact',
      },
    },
  });

  let existingIds = await prisma.contacts().id();
  console.log(existingIds);

  await prisma.createCase({
    caseId: 'CASEID-123456',
    title: 'Case 1 Title',
    status: 'open',
    referralType: 'none',
    legalPlan: 'none',
    caseNumberDetails: 'this the case number details',
    generalCaseDetails: 'this is the general case details',
    caseContacts: {
      connect: {
        id: existingIds[0].id,
      },
    },
    client: {
      create: {
        firstName: 'Ephriam',
        lastName: 'Eggplant',
      },
    },
    staffAttorneys: {
      create: [ {
        firstName: 'Finigan',
        lastName: 'Finepants',
      } ],
    },
    staffAssistants: {
      create: [ {
        firstName: 'Gina',
        lastName: 'Grape',
      } ],
    }, 
    opposingPartys: {
      create: [ {
        firstName: 'Harry',
        lastName: 'Hogwarts',
      } ],
    },
    opposingAttorneys: {
      create: [ {
        firstName: 'Indilent',
        lastName: 'Insert',
      } ],
    }, 
    referringPartys: {
      create: [ {
        firstName: 'Jillian',
        lastName: 'Juniper',
      } ],
    },
    associatedContacts: {
      create: [ {
        firstName: 'Killmonger',
        lastName: 'Kulian',
      } ],
    },
    caseNotes: {
      create: [ {
        title: 'Case1-Note1',
      },
      {
        title: 'Case1-Note2',
      },
      {
        title: 'Case1-Note3',
      }   ],
    },
  });

  existingIds = await prisma.contacts().id();
  console.log(existingIds);
  
  await prisma.createCase({
    caseId: 'CASEID-ABCDEFG',
    title: 'case 2',
    status: 'open',
    caseNumberDetails: 'this the case number details',
    generalCaseDetails: 'this is the general case details',
    caseContacts: {
      connect: {
        id: existingIds[4].id,
      },
    },
    client: {
      create: {
        firstName: 'Mariam',
        lastName: 'Marker',
      },
    },
    staffAttorneys: {
      connect: [ 
        { id: existingIds[5].id }, 
        { id: existingIds[6].id }, 
        { id: existingIds[7].id }, 
      ],
    },
    opposingPartys: {
      create: [ {
        firstName: 'Nanny',
        lastName: 'Nari',
      } ],
    },
    opposingAttorneys: {
      create: [ {
        firstName: 'Oblong',
        lastName: 'Oscar',
      } ],
    }, 
    caseNotes: {
      create: [ {
        title: 'Case2-Note1',
      },
      {
        title: 'Case2-Note2',
      } ],
    },
  });
  

  // Read all users from the database and print them to the console
  const result = await prisma.contacts();
  console.log(result);
}



createMockData().catch(e => console.error(e));