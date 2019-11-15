# JS 401 Final Project :: CaseHawk
​
## Installation
​
​
**DISCLAIMER FOR WINDOWS USERS**
​
In order for Prisma/Docker to work for you, the following is required:
​
- Windows Pro and the Docker Desktop for Windows
- [https://docs.docker.com/docker-for-windows/install/](https://docs.docker.com/docker-for-windows/install/)
- [https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly)
- Alternatively, you may download WSL2
- Note that this requires a Windows 10 build 18917 or higher
- [https://docs.microsoft.com/en-us/windows/wsl/wsl2-install](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install)
​
### To run an instance of the back end of CaseHawk:

1. Clone this repo
​
2. `$ npm install`
​
3. Create a project on Google's Developer console and create a client secret and client id for [OAuth](https://developers.google.com/identity/protocols/OAuth2WebServer). Set Redirect URI to `http://localhost:3000/oauth` and set Js origins to both local 3000 and 4000.
​
4. Create a .env file and set environment variables for:
`GOOGLE_CLIENT_ID` - from Google  
`GOOGLE_CLIENT_SECRET` - from Google  
`PORT` - the port for your server (4000)  
`SECRET` - the signature string for JWT (Can be anything)
`CLIENT_URL` - the url for your CaseHawk front end (3000)
`API_URL` - `http://localhost:4000`
`TOKEN_EXPIRE_TIME` - 1h
​
5. Download and install [Docker CE](https://docs.docker.com/v17.12/install/)
​
6. Set up a [Prisma Databse Client](https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-JAVASCRIPT-a002/)
​
7. Seed the database `$ npm run seedDB`
​
8. Start the server `$node index.js`
​
9. Refer to the README on the front-end repo for futher instructions.
​
## Additions from November 2019
​
We added access to the Google People API so it can fetch, and create data. This is implemented on the back end but currently not on the front. To test these features use Postman or HTTPie. The route of /googlecontacts uses Oauth and the People API to fetch that authenticated users contacts. The route of /importgooglecontacts that uses Oauth to authenticate which contacts you are trying to receive, and writes them to the Prisma DB.
​
For more info on Google People API reference the [docs](https://developers.google.com/people/api/rest/v1/people)
​
### Overview
​
Currently, the back end of CaseHawk requires a user to create an account using Google's Oauth service.  There are no additional restrictions on who can create an account at this time. 
​
All routes are protected with authorization middleware that expects a valid JWT to be sent along with any requests.
​
### Next Steps
​
We would recommend that users be created with roles.  An admin role should be given privileges to create a white-list of users who can sign up for an account by using the `/users` endpoint. User creation would then need to be updated to check the whitelist before allowing a user to auth with Google and receive a valid JWT.
​
In addition to a white list, functionality to support multi-tenancy should be implemented.  Organizations should be created, and an account id should be added to all database models.  Queries will then need to be updated to contain an account id that can be checked on all requests and used to filter search results from the database.
​
## Routes
​
### Overview
​
### Next Steps
​
## Database
​
### Overview
​
The app uses Postgres and Prisma for our database stack. 
​
### Next Steps
​
## Contributors
​
- ###  401d31
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
- ### 401d32
  - Sarah Gilliam
  - Peter Carmichael
  - Matthew Heyert
  - Johnathon Kimball
  - Corey Marchand