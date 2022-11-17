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
const mongoose = require('mongoose');

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

const updateUserCart = async function (res, _id, insertObject, qty, data) {
   /**
    * @param { res } Object
    * @param { _id } userModel user id to check which user is request for the add to cart product.
    * @param { insertObject } Object cantaines the insert details into the user cart document.
    * @param { qty } Number product quntity number.
    * @param { data } Object find product formation data.
    */

   // find the products is exists into the user cart.
   const findDocumentIsExists = await userModel.findOne({ _id, cart: { $elemMatch: { cartItem: insertObject.cartItem } } }, { 'cart.$': 1 });

   if (!!findDocumentIsExists && findDocumentIsExists?.cart) {
      // if the product is exists into the user cart then only inc the product quntity.
      const updateUserCart = await userModel.updateOne({ _id, cart: { $elemMatch: { cartItem: insertObject.cartItem } } }, { $inc: { 'cart.$.qty': qty } });

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
                  cart: insertObject,
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
};

const productAddToCart = catchAsync(async function (req, res, next) {
   const { productId, token, qty } = req.body;

   if (!productId) {
      next(new AppError('productId is required'));
   }

   /**
    * @productId product id for the finding selected product.
    * @token user token to varifay user is valid or not.
    * first check the product is exists or not if the product is exists then we want the check user document cart cantains the
    * selected product or not. if the user cart has already the product then only upate the quntity. if not then we want to
    * insert new product into the user cart item.
    */

   const { _id } = await tokenVarifyFunction(undefined, token);

   // also check the product variation which product variation user buy.
   // if the user buy the parent product. we don't need the add to cart the sub vairation products.
   // if the user buy the sub product variation then only add to cart the sub variation product not the parent product.
   if (req?.body?.subVariationId && !!req.body.subVariationId) {
      productModel.findOne({ _id: productId, variations: { $elemMatch: { _id: req.body.subVariationId } } }, { 'variations.$': 1 }).then(async (response) => {
         if (response) {
            const data = {
               _id: response.variations[0]._id,
               name: response.variations[0].name,
               price: response.variations[0].price,
               salePrice: response.variations[0].salePrice,
            };
            const insertObject = { cartItem: data._id, qty, subVariationProduct: true, parentProductId: productId };
            updateUserCart(res, _id, insertObject, qty, data);
         }
      });
   } else {
      // check the products is exists into the datbase. find the products using id.
      productModel.findOne({ _id: productId }, { name: 1, price: 1, salePrice: 1, productImage: 1 }).then(async (data) => {
         if (data) {
            console.log(data);
            const insertObject = { cartItem: data._id, qty, parentProductId: productId };
            updateUserCart(res, _id, insertObject, qty, data);
         }
      });
   }
});

// get the user cart pproducts from the database. always check the user token to varify the user is valid or not.
const getUserCartProducts = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   const { _id } = await tokenVarifyFunction(undefined, token);

   // find the user which user is request for the cart items.
   // check the user buy the subvariation product or not.

   const userSubVariationCartItems = await userModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      { $unwind: '$cart' },
      {
         $lookup: {
            from: 'products',
            localField: 'cart.parentProductId',
            foreignField: '_id',
            as: 'cart.productInformation',
         },
      },
      {
         $project: {
            'cart.cartItem': 1,
            'cart.qty': 1,
            'cart.subVariationProduct': 1,
            'cart.parentProductId': 1,
            'cart._id': 1,
            'cart.productInformation': {
               $arrayElemAt: ['$cart.productInformation', 0],
            },
         },
      },
      {
         $project: {
            'cart.cartItem': 1,
            'cart.qty': 1,
            'cart.subVariationProduct': 1,
            'cart.parentProductId': 1,
            'cart._id': 1,
            'cart.items': {
               $cond: {
                  if: { $eq: ['$cart.subVariationProduct', true] },
                  then: {
                     $arrayElemAt: [
                        '$cart.productInformation.variations',
                        {
                           $indexOfArray: ['$cart.productInformation.variations._id', '$cart.cartItem'],
                        },
                     ],
                  },
                  else: '$cart.productInformation',
               },
            },
         },
      },
      {
         $group: {
            _id: {
               _id: '$_id',
            },
            cartItems: {
               $push: {
                  cartItem: '$cart.items',
                  qty: '$cart.qty',
                  subVariationProduct: '$cart.subVariationProduct',
                  _id: '$cart._id',
                  parentProductId: '$cart.parentProductId',
               },
            },
         },
      },
      {
         $project: {
            '_id._id': 1,
            'cartItems.cartItem.name': 1,
            'cartItems.cartItem._id': 1,
            'cartItems.cartItem.price': 1,
            'cartItems.cartItem.salePrice': 1,
            'cartItems.cartItem.productImage': 1,
            'cartItems.qty': 1,
            'cartItems.subVariationProduct': 1,
            'cartItems.parentProductId': 1,
            'cartItems._id': 1,
         },
      },
   ]);

   if (userSubVariationCartItems) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         cartItems: !!userSubVariationCartItems.length
            ? userSubVariationCartItems
            : [
                 {
                    _id: {
                       _id: _id,
                    },
                    cartItems: [],
                 },
              ],
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

// remove user cart products.
const removerProductsFromCart = catchAsync(async function (req, res, next) {
   const { id, token } = req.query;
   if (!id) {
      next(new AppError('id is required'));
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

// when the user want to add the products into the wishlist then. grab the id and the products id to check the user is exists or not.
// if the wishlist products is already into the wishlist then remove. || add.
const addToWishListProducts = catchAsync(async function (req, res, next) {
   const { id, token } = req.body;

   if (!id) {
      next(new AppError('id is required'));
   }

   const { _id } = await tokenVarifyFunction(undefined, token);

   /**
    * find the products is exists inside the user wishlist documents.
    */ _id;
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
   const findProduct = await productModel
      .findOne(
         { _id: id },
         {
            _id: 1,
            name: 1,
            price: 1,
            salePrice: 1,
            category: 1,
            stockStatus: 1,
            productImage: 1,
            suggestedAge: 1,
            productStatusInfo: 1,
            productType: 1,
            metaContent: 1,
            createdAt: 1,
            'variations._id': 1,
            'variations.price': 1,
            'variations.salePrice': 1,
            'variations.productImage': 1,
         }
      )
      .populate('brand', { name: 1, brandIcon: 1 })
      .populate('category', { categoryImage: 1, name: 1 });
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
   res.cookie('user-address', `${req.body.address}`);
   return res.status(httpStatusCodes.OK).json({
      success: true,
      message: 'Address saved',
   });
});

const getLoginUserDeatils = catchAsync(async function (req, res, next) {
   const { token, address } = req.params;
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserAndAddress = await userModel.findOne({ _id, myAddress: { $elemMatch: { _id: address } } }, { 'myAddress.$': 1 });
   if (!!findUserAndAddress) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         address: findUserAndAddress,
      });
   } else {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         message: 'No address found',
      });
   }
});

const orderPlaceByCashOnDelivery = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   const { items, paymentMethod, addressId, currencyName, countryCode, currencySymbol } = req.body;

   // varify the user token. user is valid or not.
   const { _id } = await tokenVarifyFunction(undefined, token);

   // find the user which place we want to send the order.
   const findUserAddress = await userModel.findOne({ _id, myAddress: { $elemMatch: { _id: addressId } } }, { 'myAddress.$': 1 });
   const getUserInfo = await userModel.findOne({ _id });

   if (!findUserAddress) {
      return res.status(httpStatusCodes.NOT_FOUND).json({
         success: false,
         message: 'login user address is not found!',
      });
   }

   // remove the id for the duplicate error.
   delete findUserAddress.myAddress[0]._id;
   let itemsCount = items.length,
      itemsPrice = 0;

   // store all the user order data into the order collection.
   const saveOrder = await orderModel({
      userId: _id,
      orderItems: items,
      paymentMethod: paymentMethod,
      deliveryAddress: findUserAddress.myAddress[0],
      currencyName,
      countryCode,
      currencySymbol,
   }).save();

   if (saveOrder) {
      // once the product is placed then remove the all user cart items.
      for (let i = 0; i < items.length; i++) {
         // when the user order placed then send the email with calculate prices.
         itemsPrice += items[i]?.salePrice && !!items[i].salePrice ? items[i].salePrice * items[i].qty : items[i].price * items[i].qty;

         // remove the user cart products when the order is confirm.
         await userModel.updateOne({ _id }, { $pull: { cart: { cartItem: items[i].productId } } });
      }

      // send the email also the user and success message to the user number. for order place.
      const templatePath = path.join(__dirname, '..', 'views', 'templates', 'orderPlace.ejs');

      // ejs template object data. to send the user and the order information into the email tamp.
      const orderObject = {
         orderId: 123,
         address: findUserAddress.myAddress[0].address,
         deliveryDate: 'January 1st, 2016',
         Items: `${itemsCount}`,
         itemsPrice: `${currencySymbol} ${itemsPrice.toFixed(2)}`,
         shipping: 0,
         saleTex: 0,
         total: `${currencySymbol} ${itemsPrice.toFixed(2)}`,
      };

      // when the order is place then send back the confirmation email to the client.
      ejs.renderFile(templatePath, orderObject, (err, data) => {
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
               to: getUserInfo.email,
               subject: 'Order Confirm email',
               html: data,
            };

            // mail send to the user.
            mail.sendMail(opts, function (err, info) {
               if (err) {
                  console.log(err);
               } else {
                  console.log('email send information ');
               }
            });
         }
      });

      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Order placed Please check your email.',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
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

const getUserAddress = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   // varify the user token. user is valid or not.
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserAddress = await userModel.findOne({ _id });
   if (findUserAddress.myAddress) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         address: findUserAddress.myAddress,
      });
   }
});

const deleteUserAddress = catchAsync(async function (req, res, next) {
   const { id, token } = req.params;
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserAndDeleteAddress = await userModel.updateOne({ _id }, { $pull: { myAddress: { _id: id } } });
   if (!!findUserAndDeleteAddress.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'user address removed',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
         error: true,
      });
   }
});

const getUserSingleAddress = catchAsync(async function (req, res, next) {
   const { token, id } = req.params;
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findUserAndGetAddress = await userModel.findOne({ _id, 'myAddress._id': id }, { 'myAddress.$': 1 });
   if (findUserAndGetAddress) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         address: findUserAndGetAddress,
         error: false,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
         error: true,
      });
   }
});

const updateUserAddress = catchAsync(async function (req, res, next) {
   const { token } = req.params;
   const { _id } = await tokenVarifyFunction(undefined, token);
   const findAndUpdateAddress = await userModel.updateOne(
      { _id, myAddress: { $elemMatch: { _id: req.body._id } } },
      {
         $set: {
            'myAddress.$.fullName': req.body.fullName,
            'myAddress.$.email': req.body.email,
            'myAddress.$.phone': req.body.phone,
            'myAddress.$.country': req.body.country,
            'myAddress.$.state': req.body.state,
            'myAddress.$.city': req.body.city,
            'myAddress.$.address': req.body.address,
            'myAddress.$.IsDefault': req.body.IsDefault,
         },
      }
   );
   if (!!findAndUpdateAddress.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Address saved',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Address already updated',
      });
   }
});

// get the user order information data.
const getUserAllOrders = catchAsync(async function (req, res, next) {
   // get the client token. to check which user is request for the data.
   const { token } = req.params;
   // varify the user token.
   const { _id } = await tokenVarifyFunction(undefined, token);
   const userOrderDocument = await orderModel.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(_id) } },
      { $unwind: '$orderItems' },
      {
         $lookup: {
            from: 'products',
            localField: 'orderItems.parentProductId',
            foreignField: '_id',
            as: 'orderItems.productInformation',
         },
      },
      { $unwind: '$orderItems.productInformation' },
      {
         $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInformation',
         },
      },
      { $unwind: '$userInformation' },
      {
         $project: {
            _id: 1,
            userId: 1,
            'orderItems.productId': 1,
            'orderItems.price': 1,
            'orderItems.salePrice': 1,
            'orderItems.price': 1,
            'orderItems.parentProductId': 1,
            'orderItems.subVariation': 1,
            'orderItems.qty': 1,
            'orderItems._id': 1,
            paymentMethod: 1,
            deliveryAddress: 1,
            currencyName: 1,
            currencySymbol: 1,
            countryCode: 1,
            orderStatus: 1,
            paymentStatus: 1,
            orderCreateAt: 1,
            userInformation: 1,
            'orderItems.productInformation': 1,
            'orderItems.cartProduct': {
               $cond: {
                  if: { $eq: ['$orderItems.subVariation', true] },
                  then: {
                     $arrayElemAt: [
                        '$orderItems.productInformation.variations',
                        {
                           $indexOfArray: ['$orderItems.productInformation.variations._id', '$orderItems.productId'],
                        },
                     ],
                  },
                  else: '$orderItems.productInformation',
               },
            },
         },
      },
      {
         $group: {
            _id: {
               userId: '$userId',
               currencySymbol: '$currencySymbol',
               currencyName: '$currencyName',
               countryCode: '$countryCode',
               userInformation: '$userInformation',
            },
            orderItems: {
               $push: {
                  orderPlaceDate: '$orderCreateAt',
                  paymentStatus: '$paymentStatus',
                  price: '$orderItems.price',
                  salePrice: '$orderItems.salePrice',
                  qty: '$orderItems.qty',
                  countryCode: '$countryCode',
                  subVariation: '$orderItems.subVariation',
                  parentProductId: '$orderItems.parentProductId',
                  productInformation: {
                     _id: '$orderItems.cartProduct._id',
                     name: '$orderItems.cartProduct.name',
                     productImage: '$orderItems.cartProduct.productImage',
                  },
               },
            },
         },
      },
      {
         $project: {
            '_id.userId': 1,
            '_id.currencySymbol': 1,
            '_id.currencyName': 1,
            '_id.countryCode': 1,
            '_id.userInformation.name': 1,
            '_id.userInformation.email': 1,
            '_id.userInformation.userProfileImage': 1,
            orderItems: 1,
         },
      },
   ]);

   // const userOrderDocument = await getSingleOrderInformation(_id, 'userId');
   if (userOrderDocument) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         order: userOrderDocument,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
   }
});

// get user single order.
const getUserSingleOrderDetails = catchAsync(async function (req, res, next) {
   const { token, id } = req.params;
   if (!id) {
      next(new AppError('Order Id is required!'));
   }
   // varify the user token.
   const { _id } = await tokenVarifyFunction(undefined, token);

   const userOrder = await orderModel.aggregate([
      {
         $match: {
            $and: [{ userId: mongoose.Types.ObjectId(_id) }, { 'orderItems.productId': mongoose.Types.ObjectId(id) }],
         },
      },
      {
         $project: {
            _id: 1,
            userId: 1,
            paymentMethod: 1,
            deliveryAddress: 1,
            currencyName: 1,
            countryCode: 1,
            currencySymbol: 1,
            orderStatus: 1,
            paymentStatus: 1,
            orderCreateAt: 1,
            order: {
               $arrayElemAt: [
                  '$orderItems',
                  {
                     $indexOfArray: ['$orderItems.productId', mongoose.Types.ObjectId(id)],
                  },
               ],
            },
         },
      },
      {
         $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInformation',
         },
      },
      {
         $lookup: {
            from: 'products',
            localField: 'order.productId',
            foreignField: '_id',
            as: 'order.productInformation',
         },
      },
      { $unwind: '$order.productInformation' },
      { $unwind: '$userInformation' },
      {
         $project: {
            _id: 1,
            userId: 1,
            paymentMethod: 1,
            deliveryAddress: 1,
            currencyName: 1,
            countryCode: 1,
            currencySymbol: 1,
            orderStatus: 1,
            paymentStatus: 1,
            orderCreateAt: 1,
            'order.productId': 1,
            'order.price': 1,
            'order.salePrice': 1,
            'order.qty': 1,
            'order.productInformation._id': 1,
            'order.productInformation.name': 1,
            'order.productInformation.price': 1,
            'order.productInformation.salePrice': 1,
            'order.productInformation.category': 1,
            'order.productInformation.productImage': 1,
            'userInformation.name': 1,
            'userInformation._id': 1,
            'userInformation.email': 1,
            'userInformation.userProfileImage': 1,
         },
      },
   ]);

   if (userOrder) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         userOrder,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
   }
});

const getProductSubVariation = catchAsync(async function (req, res, next) {
   const { variationId, collectionId } = req.params;
   const findSubVariation = await productModel.findOne({ _id: collectionId, variations: { $elemMatch: { _id: variationId } } }, { 'variations.$': 1 });
   if (findSubVariation) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         productVariationData: findSubVariation,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
   }
});

const getProductCollectionData = catchAsync(async function (req, res, next) {
   const { collectionId } = req.params;
   const findProduct = await productModel.findOne({ _id: collectionId }, { variations: 0, metaContent: 0, tags: 0, category: 0 });
   if (findProduct) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         productData: findProduct,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
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
   getUserAddress,
   deleteUserAddress,
   getUserSingleAddress,
   updateUserAddress,
   getUserAllOrders,
   getUserSingleOrderDetails,
   getProductSubVariation,
   getProductCollectionData,
};
