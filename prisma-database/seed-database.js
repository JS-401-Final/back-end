const { prisma } = require('./generated/prisma-client');

async function createMockData() {

  const newUser = await prisma.createUser({
    userName: 'Adam First',
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

  let existingUserIds = await prisma.users().id();
  console.log('existingUserIds', existingUserIds);

  let existingContactIds = await prisma.contacts().id();
  console.log('existingContactIds', existingContactIds);

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
        id: existingContactIds[0].id,
      },
    },
    client: {
      create: {
        firstName: 'Ephriam',
        lastName: 'Eggplant',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Ephriam@email.com',
        emailBackup: 'Ephriam@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Ephriam on his contact card',
      },
    },
    staffAttorneys: {
      create: [{
        firstName: 'Finigan',
        lastName: 'Finepants',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Finigan@email.com',
        emailBackup: 'Finigan@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Finigan on his contact card',
        contactType: 'staff attorney',
      }],
    },
    staffAssistants: {
      create: [{
        firstName: 'Gina',
        lastName: 'Grape',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Gina@email.com',
        emailBackup: 'Gina@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Gina on his contact card',
        contactType: 'staff',
      }],
    },
    opposingParties: {
      create: [{
        firstName: 'Harry',
        lastName: 'Hogwarts',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Gina@email.com',
        emailBackup: 'Gina@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Gina on his contact card',
      }],
    },
    opposingAttorneys: {
      create: [{
        firstName: 'Ingrid',
        lastName: 'Intelligent',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Ingrid@email.com',
        emailBackup: 'Ingrid@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Ingrid on his contact card',
        contactType: 'attorney',
      }],
    },
    referringParties: {
      create: [{
        firstName: 'Jillian',
        lastName: 'Juniper',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Jillian@email.com',
        emailBackup: 'Jillian@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Jillian on his contact card',
        contactType: 'refer',
      }],
    },
    associatedContacts: {
      create: [{
        firstName: 'Kulian',
        lastName: 'KarateKid',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Kulian@email.com',
        emailBackup: 'Kulian@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Kulian on his contact card',
        contactType: 'related',
      }],
    },
    caseNotes: {
      create: [{
        title: 'Case1-Note1',
        author: {
          connect: {
            id: existingUserIds[0].id,
          },
        },
      },
      {
        title: 'Case1-Note2',
        author: {
          connect: {
            id: existingUserIds[0].id,
          },
        },
      },
      {
        title: 'Case1-Note3',
        author: {
          connect: {
            id: existingUserIds[0].id,
          },
        },
      }],
    },
  });

  existingContactIds = await prisma.contacts().id();
  console.log(existingContactIds);

  await prisma.createCase({
    caseId: 'CASEID-ABCDEFG',
    title: 'case 2',
    status: 'open',
    caseNumberDetails: 'this the case number details',
    generalCaseDetails: 'this is the general case details',
    caseContacts: {
      connect: {
        id: existingContactIds[4].id,
      },
    },
    client: {
      create: {
        firstName: 'Mariam',
        lastName: 'Marker',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Mariam@email.com',
        emailBackup: 'Mariam@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Mariam on his contact card',
        contactType: 'client',
      },
    },
    staffAttorneys: {
      connect: [
        { id: existingContactIds[5].id },
        { id: existingContactIds[6].id },
        { id: existingContactIds[7].id },
      ],
    },
    opposingParties: {
      create: [{
        firstName: 'Nanny',
        lastName: 'Nari',
      }],
    },
    opposingAttorneys: {
      create: [{
        firstName: 'Oblong',
        lastName: 'Oscar',
        homeStreet: '1234 ABCD Street',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'WA',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'Suite #1',
        emailMain: 'Oblong@email.com',
        emailBackup: 'Oblong@email.com',
        socialSecurity: 1234567890,
        cellPhone: 1234567890,
        workPhone: 1234567890,
        homePhone: 1234567890,
        fax: 1234567890,
        contactComment: 'This is a comment about Oblong on his contact card',
        contactType: 'attorney',
      }],
    },
    caseNotes: {
      create: [{
        title: 'Case2-Note1',
        author: {
          connect: {
            id: existingUserIds[1].id,
          },
        },
      },
      {
        title: 'Case2-Note2',
        author: {
          connect: {
            id: existingUserIds[2].id,
          },
        },
      }],
    },
  });


  // Read all users from the database and print them to the console
  const result = await prisma.contacts();
  console.log(result);
}



createMockData().catch(e => console.error(e));