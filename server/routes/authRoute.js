const express = require('express');
const route = express.Router();

const authControllers = require('../controllers/authController');

route.post('/signin', authControllers.signInUser);
route.post('/admin-sign-in', authControllers.logInUser);

module.exports = route;
