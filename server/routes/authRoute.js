const express = require('express');
const route = express.Router();

const authControllers = require('../controllers/authController');
const { checkIsTokenExists } = require('../helpers/helpers');

// API => POST
route.post('/signin', authControllers.signInUser);
route.post('/admin-sign-in', authControllers.logInUser);

// API => PATCH
route.patch('/change-password/:token', checkIsTokenExists, authControllers.changeUserPassword);

module.exports = route;
