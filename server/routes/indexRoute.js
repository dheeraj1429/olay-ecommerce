const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexControllers');

// API => GET
route.get('/get-product-genral-report', indexController.getProductGenralReport);
route.get('/get-signin-users', indexController.getAllSignInUsers);

module.exports = route;
