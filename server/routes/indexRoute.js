const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexControllers');

// API => GET
route.get('/get-tranding-products', indexController.getTrandingProducts);

module.exports = route;
