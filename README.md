# JS 401 Final Project :: CaseHawk

## Installation

#### To run an instance of the back end of CaseHawk:

1. Clone this repo
2. `$ npm i`
3. Create a project on Google's Developer console and create a client secret and client id for [OAuth](https://developers.google.com/identity/protocols/OAuth2WebServer).  
4. Set environment variables for:
`GOOGLE_CLIENT_ID` - from Google  
`GOOGLE_CLIENT_SECRET` - from Google  
`PORT` - the port for your server  
`SECRET` - the signature string for JWT   
`CLIENT_URL` - the url for your CaseHawk front end
5. Set up a [Prisma Databse Client](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)
6. Seed the database `$ npm run seedDB`
7. Start the server `$node index.js`

## Authorization

#### Overview

Currently, the back end of CaseHawk requires a user to create an account using Google's Oauth service.  There are no additional restrictions on who can create an account at this time. 

All routes are protected with authorization middleware that expects a valid JWT to be sent along with any requests.

#### Next Steps

We would recommend that users be created with roles.  An admin role should be given privileges to create a white-list of users who can sign up for an account by using the `/users` endpoint. User creation would then need to be updated to check the whitelist before allowing a user to auth with Google and receive a valid JWT.

In addition to a white list, functionality to support multi-tenancy should be implemented.  Organizations should be created, and an account id should be added to all database models.  Queries will then need to be updated to contain an account id that can be checked on all requests and used to filter search results from the database.

## Contributors
- 401d31
    - Austin Hedeen
    - Benjamin Clark
    - Bradley G. Elliott
    - Corey Chang
    - Evan BC
    - Hanna Alemu
    - Jessica Walters
    - Leyla Li
    - Lillian Gales
    - Joanna Arroyo
    - Trae Bennett
