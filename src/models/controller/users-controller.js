'use strict';
/**
 * @module router/users
 * @requires express
 */

const express = require('express');
const router = express.Router();
const { prisma } = require('../../../prisma-database/generated/prisma-client');
const auth = require('../../auth/middleware');

/**
 * This function creates a new user in the database
 * @function POST
 * @param {string} path - Express Path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - the newly created user object
 */

async function handleCreateNewUser(req, res){
  const newUser = await prisma.createUser(req.body);
  res.json(newUser);
}


/**
 * This function gets all user data from database
 * @function GET
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Array | Error) } - an array of all users
 */

async function handleGetUserDataDB(req, res){
  const users = await prisma.users();
  res.json(users);
}

/**
 * This function gets a user from database
 * @function GET/:id
 * @param {string} path - express path
 * @param {function} callback - express callback
 * @returns { (Object | Error) } - a single user object
 */

async function handleGetUserFromDB(req, res){
  const user = await prisma.user({ id: req.params.id });
  res.json(user);
}

module.exports = {
  handleCreateNewUser,
  handleGetUserDataDB,
  handleGetUserFromDB,
};