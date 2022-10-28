const { catchAsync, tokenVarifyFunction } = require('../helpers/helpers');
const productModel = require('../model/schema/productSchema');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const AppError = require('../helpers/appError');
const userModel = require('../model/schema/authSchema');

// grab the sale products from the databse and then send back the data to the client.
const getTrandingProducts = catchAsync(async function (req, res, next) {
   const findProducts = await productModel.aggregate([
      // stage one
      { $match: { salePrice: { $exists: true } } },
      // stage two
      { $project: { _id: 1, name: 1, price: 1, productImage: 1, stockStatus: 1, salePrice: 1 } },
      // stage three
      { $limit: 5 },
   ]);

   // if there is there is some error then send back the message to the client. otherwise send back the filters products.
   if (findProducts) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         products: findProducts,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

// get the client selected products when the client query for the single products from the database.
// also check the id is present or the products id. if some cridentials is missing the throw the error.
const getSelectedPrevProduct = catchAsync(async function (req, res, next) {
   const { id } = req.params;

   if (!id) {
      next(new AppError('Id is required'));
   }

   const findSelectedProduct = await productModel
      .findOne({ _id: id })
      .populate('brand', { name: 1, website: 1, brandIcon: 1 })
      .populate('category', { products: 0 });

   if (findSelectedProduct) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         product: findSelectedProduct,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

const productAddToCart = catchAsync(async function (req, res, next) {
   const { productId, token, qty } = req.body;

   if (!productId) {
      next(new AppError('productId is required'));
   }

   if (!token) {
      next(new AppError('token is required'));
   }

   /**
    * @productId product id for the finding selected product.
    * @token user token to varifay user is valid or not.
    * first check the product is exists or not if the product is exists then we want the check user document cart cantains the
    * selected product or not. if the user cart has already the product then only upate the quntity. if not then we want to
    * insert new product into the user cart item.
    */

   const { _id } = await tokenVarifyFunction(undefined, token);
   productModel.findOne({ _id: productId }, { name: 1, price: 1, salePrice: 1, productImage: 1 }).then(async (data) => {
      if (data) {
         const findDocumentIsExists = await userModel.findOne(
            { _id, cart: { $elemMatch: { cartItem: data._id } } },
            { 'cart.$': 1 }
         );

         if (!!findDocumentIsExists && findDocumentIsExists?.cart) {
            const updateUserCart = await userModel.updateOne(
               { _id, cart: { $elemMatch: { cartItem: data._id } } },
               { $inc: { 'cart.$.qty': qty } }
            );

            if (!!updateUserCart.modifiedCount) {
               return res.status(httpStatusCodes.OK).json({
                  success: true,
                  message: 'Product added',
                  insertedProduct: data,
                  insertProductQuntity: qty,
               });
            }
         } else {
            userModel
               .updateOne(
                  { _id },
                  {
                     $push: {
                        cart: { cartItem: data._id, qty },
                     },
                  }
               )
               .then((response) => {
                  if (!!response.modifiedCount) {
                     return res.status(httpStatusCodes.CREATED).json({
                        success: true,
                        message: 'Product added into the cart',
                        insertedProduct: data,
                        insertProductQuntity: qty,
                     });
                  }
               });
         }
      }
   });
});

const checkTokenIsExists = function (token, next) {
   /**
    * check the token is exists or note if there is no token the throw new error.
    */
   if (!token) {
      next(new AppError('user token is required'));
   }
};

// get the user cart pproducts from the database. always check the user token to varify the user is valid or not.
const getUserCartProducts = catchAsync(async function (req, res, next) {
   const { token } = req.params;

   checkTokenIsExists(token, next);

   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserCartItems = await userModel
      .findOne({ _id })
      .populate('cart.cartItem', { name: 1, price: 1, productImage: 1, salePrice: 1 });
   if (findUserCartItems) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         cartItems: findUserCartItems.cart,
      });
   }
});

// remove user cart products.
const removerProductsFromCart = catchAsync(async function (req, res, next) {
   const { id, token } = req.query;
   if (!id) {
      next(new AppError('id is required'));
   }
   checkTokenIsExists(token, next);
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserAndRemoveCartItem = await userModel.updateOne({ _id }, { $pull: { cart: { cartItem: id } } });
   if (!!findUserAndRemoveCartItem.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'product remove from the cart',
         removeProductId: id,
      });
   }
});

// when the user want to add the products into the wishlist then. grab the id and the products id to check the user is exists or not.
// if the wishlist products is already into the wishlist then remove. || add.
const addToWishListProducts = catchAsync(async function (req, res, next) {
   const { id, token } = req.body;

   if (!id) {
      next(new AppError('id is required'));
   }

   checkTokenIsExists(token, next);

   const { _id } = await tokenVarifyFunction(undefined, token);

   /**
    * find the products is exists inside the user wishlist documents.
    */
   userModel.findOne({ _id, wishLists: { $elemMatch: { ItemId: id } } }, { 'wishLists.$': 1 }).then((data) => {
      if (!!data && data.wishLists && data.wishLists.length) {
         // remove wislist products
         userModel.updateOne({ _id }, { $pull: { wishLists: { ItemId: id } } }).then((response) => {
            if (!!response.modifiedCount) {
               return res.status(httpStatusCodes.OK).json({
                  success: true,
                  message: 'Products remove from the wishlist',
                  product: 'remove',
                  productId: id,
               });
            }
         });
      } else {
         userModel.updateOne({ _id }, { $push: { wishLists: { ItemId: id } } }).then((response) => {
            // add wishlist products
            if (!!response.modifiedCount) {
               return res.status(httpStatusCodes.OK).json({
                  success: true,
                  message: 'Product added into wishlist',
                  product: 'add',
                  productId: id,
               });
            }
         });
      }
   });
});

// grab the user wishlist data array.
const getUserWishListProducts = catchAsync(async function (req, res, next) {
   const { token } = req.query;
   checkTokenIsExists(token, next);

   const { _id } = await tokenVarifyFunction(undefined, token);

   userModel
      .aggregate([
         { $match: { $expr: { $eq: ['$_id', { $toObjectId: _id }] } } },
         { $unwind: '$wishLists' },
         { $group: { _id: '$_id', wishLists: { $push: '$wishLists.ItemId' } } },
      ])
      .then((response) => {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            items: response,
         });
      });
});

module.exports = {
   getTrandingProducts,
   getSelectedPrevProduct,
   productAddToCart,
   getUserCartProducts,
   removerProductsFromCart,
   addToWishListProducts,
   getUserWishListProducts,
};
