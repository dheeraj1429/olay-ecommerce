const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexControllers');

// API => GET
route.get('/get-tranding-products', indexController.getTrandingProducts);
route.get('/get-prev-product/:id', indexController.getSelectedPrevProduct);
route.get('/get-cart-products/:token', indexController.getUserCartProducts);

// API => POST
route.post('/add-to-cart-product', indexController.productAddToCart);

// API => PATCH
route.patch('/remove-cart-item', indexController.removerProductsFromCart);

module.exports = route;
