const { prisma } = require('./generated/prisma-client');

async function createMockData() {

  const newUser = await prisma.createUser({
    userName: 'Adam Smith',
  });

  await prisma.createUser({
    email: 'alfred@email.com',
    userName: 'Alfred Alfy',
    role: 'admin',
    contact: {
      create: {
        contactType: 'attorney',
        firstName: 'Alred',
        lastName: 'Alfy',
        homeStreet: '1233 Alf Lane',
        homeStreet2: 'Suite #5',
        homeCity: 'Seattle',
        homeState: 'Washington',
        homeZip: '98103',
        workStreet: '134 Denny Ave.',
        workStreet2: 'Suite #5',
        emailMain: 'alfred@email.com',
        emailBackup: 'alred2@email.com',
        socialSecurity: '1453252435',
        cellPhone: '2056871237',
        workPhone: '2445678999',
        homePhone: '2345678996',
        fax: '8723904802',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
    },
  });

  await prisma.createUser({
    email: 'ben@email.com',
    userName: 'Ben Benjy',
    role: 'ben',
    contact: {
      create: {
        contactType: 'attorney',
        firstName: 'Ben',
        lastName: 'Benjy',
        homeStreet: '1233 Ben Lane',
        homeStreet2: 'App #5',
        homeCity: 'Seattle',
        homeState: 'Washington',
        homeZip: '98103',
        workStreet: '134 Denny',
        workStreet2: 'App #5',
        emailMain: 'ben@email.com',
        emailBackup: 'ben2@email.com',
        socialSecurity: '145325',
        cellPhone: '2056871237',
        workPhone: '2345678999',
        homePhone: '2345678996',
        fax: '8723904802',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
    },
  });

  let existingUserIds = await prisma.users().id();
  console.log('existingUserIds', existingUserIds);

  let existingContactIds = await prisma.contacts().id();
  console.log('existingContactIds', existingContactIds);

  await prisma.createCase({
    caseId: 'CASEID-123456',
    title: 'Case 1',
    status: 'Open',
    referralType: 'None',
    legalPlan: 'None',
    caseNumberDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    generalCaseDetails: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
        contactComment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        contactType: 'related',
      }],
    },
    caseNotes: {
      create: [{
        title: 'Case1-Note1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: {
          connect: {
            id: existingUserIds[0].id,
          },
        },
      },
      {
        title: 'Case1-Note2',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: {
          connect: {
            id: existingUserIds[0].id,
          },
        },
      },
      {
        title: 'Case1-Note3',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
    title: 'Case 2',
    status: 'Open',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
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
        socialSecurity: '1234567890',
        cellPhone: '1234567890',
        workPhone: '1234567890',
        homePhone: '1234567890',
        fax: '1234567890',
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