const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexControllers');

// API => GET
route.get('/get-tranding-products', indexController.getTrandingProducts);
route.get('/get-prev-product/:id', indexController.getSelectedPrevProduct);
route.get('/get-cart-products/:token', indexController.getUserCartProducts);
route.get('/get-wishlist-products', indexController.getUserWishListProducts);
route.get('/get-single_product/:id', indexController.getSingleProduct);
route.get('/get-random-products', indexController.getRandomProducts);
route.get('/get-login-user/:token', indexController.getLoginUserDeatils);
route.get('/get-user-data/:token', indexController.getUserData);

// API => POST
route.post('/add-to-cart-product', indexController.productAddToCart);
route.post('/add-to-wish-list', indexController.addToWishListProducts);
route.post('/news-letter', indexController.subcsriptionHandler);
route.post('/user-shipping-infomation/:token', indexController.storeUserShippingInformation);
route.post('/place-user-cash-on-delivery', indexController.orderPlaceByCashOnDelivery);

// API => PATCH
route.patch('/remove-cart-item', indexController.removerProductsFromCart);
route.patch('/update-user-info', indexController.updateUserData);

module.exports = route;
