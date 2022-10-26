const { catchAsync, tokenVarifyFunction } = require('../helpers/helpers');
const productModel = require('../model/schema/productSchema');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const AppError = require('../helpers/appError');
const userModel = require('../model/schema/authSchema');

const getTrandingProducts = catchAsync(async function (req, res, next) {
   const findProducts = await productModel.aggregate([
      { $match: { salePrice: { $exists: true } } },
      { $project: { _id: 1, name: 1, price: 1, productImage: 1, stockStatus: 1, salePrice: 1 } },
      { $limit: 5 },
   ]);

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

const getUserCartProducts = catchAsync(async function (req, res, next) {
   const { token } = req.params;

   if (!token) {
      next(new AppError('user token is required'));
   }

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

const removerProductsFromCart = catchAsync(async function (req, res, next) {
   const { id, token } = req.query;
   if (!id) {
      next(new AppError('id is required'));
   }
   if (!token) {
      next(new AppError('user token is required'));
   }
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

module.exports = {
   getTrandingProducts,
   getSelectedPrevProduct,
   productAddToCart,
   getUserCartProducts,
   removerProductsFromCart,
};
