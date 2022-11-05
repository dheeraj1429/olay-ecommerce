const { catchAsync, tokenVarifyFunction } = require('../helpers/helpers');
const productModel = require('../model/schema/productSchema');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const AppError = require('../helpers/appError');
const userModel = require('../model/schema/authSchema');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const subscriptionModel = require('../model/schema/subscriptionUsersSchema');
const orderModel = require('../model/schema/ordersSchema');

// grab the sale products from the databse and then send back the data to the client.
const getTrandingProducts = catchAsync(async function (req, res, next) {
   const findProducts = await productModel.aggregate([
      // stage one
      { $match: { salePrice: { $exists: true }, salePrice: { $gt: 0 } } },
      // stage two
      { $project: { _id: 1, name: 1, price: 1, productImage: 1, stockStatus: 1, salePrice: 1 } },
      // stage three
      { $sort: { salePrice: 1 } },
      // stage four
      { $limit: 10 },
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

   const findSelectedProduct = await productModel.findOne({ _id: id }).populate('brand', { name: 1, website: 1, brandIcon: 1 }).populate('category', { products: 0 });

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

   // check the products is exists into the datbase. find the products using id.
   productModel.findOne({ _id: productId }, { name: 1, price: 1, salePrice: 1, productImage: 1 }).then(async (data) => {
      if (data) {
         // find the products is exists into the user cart.
         const findDocumentIsExists = await userModel.findOne({ _id, cart: { $elemMatch: { cartItem: data._id } } }, { 'cart.$': 1 });

         if (!!findDocumentIsExists && findDocumentIsExists?.cart) {
            // if the product is exists into the user cart then only inc the product quntity.
            const updateUserCart = await userModel.updateOne({ _id, cart: { $elemMatch: { cartItem: data._id } } }, { $inc: { 'cart.$.qty': qty } });

            if (!!updateUserCart.modifiedCount) {
               return res.status(httpStatusCodes.OK).json({
                  success: true,
                  message: 'Product added',
                  insertedProduct: data,
                  insertProductQuntity: qty,
               });
            }
         } else {
            // else insert the products into the user cart.
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
   const findUserCartItems = await userModel.findOne({ _id }).populate('cart.cartItem', { name: 1, price: 1, productImage: 1, salePrice: 1 });
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
      .aggregate([{ $match: { $expr: { $eq: ['$_id', { $toObjectId: _id }] } } }, { $unwind: '$wishLists' }, { $group: { _id: '$_id', wishLists: { $push: '$wishLists.ItemId' } } }])
      .then((response) => {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            items: response,
         });
      });
});

// send the news letter when the user successfully subscription the website.
const subcsriptionHandler = catchAsync(async function (req, res, next) {
   /**
    * @param { String } email.
    * @param { String } userName.
    * is there is no email then send back the error reponse.
    * if the email is successfully send the user then render the ejs template then send them into the user email.
    * once the user is subscrip the website then store the user infomation into the database.
    */

   const { email, userName, token } = req.body;

   if (!email) {
      next(new AppError('news letter email is requred!'));
   }

   // varify the user token.
   checkTokenIsExists(token, next);
   const { _id } = await tokenVarifyFunction(undefined, token);

   // first check the user alrady subscription the website or not.
   subscriptionModel.findOne({ email: email }).then((data) => {
      if (data) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'Already subscribe with this mail.',
         });
      } else {
         // subscription thank you page.
         const templatePath = path.join(__dirname, '..', 'views', 'templates', 'emailSubscription.ejs');

         // send back the thank you template.
         ejs.renderFile(templatePath, { customerName: userName }, (err, data) => {
            if (err) {
               console.log(err);
            } else {
               // mail information.
               const mail = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                     user: process.env.EMAIL,
                     pass: process.env.APPPASSWORD,
                  },
               });

               // mail optaions
               const opts = {
                  from: process.env.EMAIL,
                  to: email,
                  subject: 'News letter subscription',
                  html: data,
               };

               // mail send to the user.
               mail.sendMail(opts, function (err, info) {
                  if (err) {
                     return res.status(httpStatusCodes.OK).json({
                        success: false,
                        message: 'mail not send!!',
                     });
                  } else {
                     console.log(info);

                     // when the mail is send successfully then store the user infomation into the database.
                     // first check the user is exits or not. if the user is exists alrady then we don't need the to store the user info into the database.
                     subscriptionModel({
                        name: userName,
                        email,
                        token,
                        userId: _id,
                     })
                        .save()
                        .then((response) => {
                           return res.status(httpStatusCodes.OK).json({
                              success: true,
                              message: 'Thank you for subscription, please check your email',
                           });
                        });
                  }
               });
            }
         });
      }
   });
});

const getSingleProduct = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   if (!id) {
      next(new AppError('product id is required'));
   }
   const findProduct = await productModel.findOne({ _id: id }).populate('brand', { name: 1, brandIcon: 1 }).populate('category', { categoryImage: 1, name: 1 });
   if (findProduct) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         product: findProduct,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const getRandomProducts = catchAsync(async function (req, res, next) {
   const products = await productModel.aggregate([{ $sample: { size: 10 } }]);

   if (products) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         product: products,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const storeUserShippingInformation = catchAsync(async function (req, res, next) {
   const { token } = req.params;

   if (!token) {
      next(new AppError('user token is required'));
   }

   // grab required fields from the request
   const { country, address, state, pinCode } = req.body;

   // if some required fields is missing then send back the error response.
   if (!!country && address && state && pinCode) {
      // clone the req object values into the new object.
      const insertObject = Object.assign(req.body);

      // find the user which user is fill the shipping information.
      const { _id } = await tokenVarifyFunction(undefined, token);

      // check address is already in a database or not.
      const findAddress = await userModel.findOne({ 'ShippingInfo.country': country, 'ShippingInfo.address': address, 'ShippingInfo.state': state });

      if (findAddress) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'user shipping information already saved',
         });
      } else {
         // insert data inside the user document.
         const insertShippingInfo = await userModel.updateOne({ _id }, { $push: { ShippingInfo: insertObject } });

         if (insertShippingInfo) {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: 'user shipping information saved',
            });
         } else {
            return res.status(httpStatusCodes.INTERNAL_SERVER).json({
               success: false,
               message: 'internal server error',
            });
         }
      }
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'fill all required fields!',
      });
   }
});

const getLoginUserDeatils = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   if (!token) {
      next(new AppError('user token is required'));
   }
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUser = await userModel.findOne({ _id }, { ShippingInfo: 1, userContactEmail: 1 });
   if (findUser) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         user: findUser,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

const orderPlaceByCashOnDelivery = catchAsync(async function (req, res, next) {
   // const { userToken } = req.body;
   // if (!userToken) {
   //    next(new AppError('user token is required'));
   // }
   // // varify the user token. user is valid or not.
   // const { _id } = await tokenVarifyFunction(undefined, userToken);
   // const { items, paymentMethod } = req.body;
   // let orderPlace;
   // for (let i = 0; i < items.length; i++) {
   //    // insert all the user product into the order document.
   //    orderPlace = await orderModel({ userId: _id, productId: items[i].cartItem._id, qty: items[i].qty, paymentMethod }).save();
   // }
   // if (orderPlace) {
   //    // once all products is inserted into the order document. and place all the orders. the remove the user cart products.
   //    for (let i = 0; i < items.length; i++) {
   //       await userModel.updateOne({ _id }, { $pull: { cart: { _id: items[i]._id } } });
   //    }
   //    return res.status(httpStatusCodes.CREATED).json({
   //       success: true,
   //       message: 'Order placed',
   //    });
   // } else {
   //    return res.status(httpStatusCodes.INTERNAL_SERVER).json({
   //       success: false,
   //       message: 'internal server error',
   //    });
   // }
});

const getUserData = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   if (!token) {
      next(new AppError('user token is required'));
   }
   // varify the user token. user is valid or not.
   const { _id } = await tokenVarifyFunction(undefined, token);
   const user = await userModel.findOne({ _id }, { name: 1, email: 1, phone: 1, dateOfBirth: 1 });
   if (user) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         user,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

const updateUserData = catchAsync(async function (req, res, next) {
   const { _id } = req.body;
   if (!_id) {
      next(new AppError('user id is required'));
   }
   const { name, dateOfBirth, phone, email, isAdmin, userProfileImage, token } = req.body;

   // first check email is already exists or not
   const emailIsEsists = await userModel.findOne({ email, _id: { $ne: _id } });

   if (emailIsEsists) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'email is already used',
         error: true,
      });
   } else {
      // update the document.
      const findUserAndUpdate = await userModel.updateOne({ _id }, { $set: { name, dateOfBirth, phone, email } });

      if (!!findUserAndUpdate.modifiedCount) {
         const userObject = {
            name: name,
            email: email,
            isAdmin: isAdmin,
            userProfileImage: userProfileImage,
            token: token,
         };

         // set the user info into the cookie
         res.cookie('user', userObject);

         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'User information updated',
            user: userObject,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            success: false,
            message: 'internal server error',
            error: true,
         });
      }
   }
});

const insertUserAddress = catchAsync(async function (req, res, next) {
   const { token } = req.body;

   if (!token) {
      next(new AppError('user token is required'));
   }

   const userAddressObject = { ...req.body };
   delete userAddressObject.token;

   // varify the user token. user is valid or not.
   const { _id } = await tokenVarifyFunction(undefined, token);

   // check the address is exists or not.
   const findAddressIsExists = await userModel.findOne(
      {
         _id,
         myAddress: { $elemMatch: { country: userAddressObject.country, address: userAddressObject.address, state: userAddressObject.state } },
      },
      { 'myAddress.$': 1 }
   );

   if (!!findAddressIsExists) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'address is already exists',
      });
   } else {
      // find the user and inser the address date into the user document.
      const findAndUpdateUser = await userModel.updateOne({ _id }, { $push: { myAddress: userAddressObject } });

      if (!!findAndUpdateUser.modifiedCount) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            message: 'Address saved',
         });
      }
   }
});

module.exports = {
   getTrandingProducts,
   getSelectedPrevProduct,
   productAddToCart,
   getUserCartProducts,
   removerProductsFromCart,
   addToWishListProducts,
   getUserWishListProducts,
   subcsriptionHandler,
   getSingleProduct,
   getRandomProducts,
   storeUserShippingInformation,
   getLoginUserDeatils,
   orderPlaceByCashOnDelivery,
   getUserData,
   updateUserData,
   insertUserAddress,
};
