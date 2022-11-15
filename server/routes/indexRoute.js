const express = require('express');
const route = express.Router();
const indexController = require('../controllers/indexControllers');

const checkIsTokenExists = function (req, res, next) {
   const { token } = req.params;

   if (!token) {
      return res.status(500).json({
         message: 'user token is not found!',
         error: true,
         success: false,
      });
   } else {
      next();
   }
};

// API => GET
route.get('/get-tranding-products', indexController.getTrandingProducts);
route.get('/get-prev-product/:id', indexController.getSelectedPrevProduct);
route.get('/get-cart-products/:token', checkIsTokenExists, indexController.getUserCartProducts);
route.get('/get-wishlist-products/:token', checkIsTokenExists, indexController.getUserWishListProducts);
route.get('/get-single_product/:id', indexController.getSingleProduct);
route.get('/get-random-products', indexController.getRandomProducts);
route.get('/get-login-user-address-info/:token/:address', checkIsTokenExists, indexController.getLoginUserDeatils);
route.get('/get-user-data/:token', checkIsTokenExists, indexController.getUserData);
route.get('/get-user-address/:token', checkIsTokenExists, indexController.getUserAddress);
route.get('/get-user-address/:token/:id', checkIsTokenExists, indexController.getUserSingleAddress);
route.get('/get-user-order-info/:token', checkIsTokenExists, indexController.getUserAllOrders);
route.get('/get-user-single-order-info/:token/:id', checkIsTokenExists, indexController.getUserSingleOrderDetails);
route.get('/get-product-sub-variation/:variationId/:collectionId', indexController.getProductSubVariation);

// API => POST
route.post('/add-to-cart-product/:token', checkIsTokenExists, indexController.productAddToCart);
route.post('/add-to-wish-list/:token', checkIsTokenExists, indexController.addToWishListProducts);
route.post('/news-letter/:token', checkIsTokenExists, indexController.subcsriptionHandler);
route.post('/user-shipping-infomation/:token', checkIsTokenExists, indexController.storeUserShippingInformation);
route.post('/place-user-cash-on-delivery/:token', checkIsTokenExists, indexController.orderPlaceByCashOnDelivery);
route.post('/insert-new-address/:token', checkIsTokenExists, indexController.insertUserAddress);

// API => PATCH
route.patch('/remove-cart-item/:token', checkIsTokenExists, indexController.removerProductsFromCart);
route.patch('/update-user-info/:token', checkIsTokenExists, indexController.updateUserData);
route.patch('/update-user-address/:token', checkIsTokenExists, indexController.updateUserAddress);

// API => DELTE
route.delete('/delete-user-address/:token/:id', checkIsTokenExists, indexController.deleteUserAddress);

module.exports = route;
