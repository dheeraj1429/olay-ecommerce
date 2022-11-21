const userModel = require('../model/schema/authSchema');
const bcryptjs = require('bcryptjs');
const { catchAsync, tokenVarifyFunction } = require('../helpers/helpers');
const httpStatusCodes = require('../helpers/httpStatusCodes');

const signInUser = catchAsync(async function (req, res, next) {
   const { name, email, password } = req.body;

   if (name && email && password) {
      const userIsExists = await userModel.findOne({ email });

      if (userIsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'User is exists',
         });
      }

      const createNewUser = await userModel({
         name,
         email,
         password,
      });

      const saveUser = await createNewUser.save();
      const genrateToken = await saveUser.genrateUserToken();

      const userObject = {
         name: saveUser.name,
         email: saveUser.email,
         isAdmin: saveUser.isAdmin,
         userProfileImage: saveUser.userProfileImage,
         token: genrateToken,
      };

      // set the user info into the cookie
      res.cookie('user', userObject);

      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         userObject,
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'User is not fill all details which is required',
      });
   }
});

const logInUser = catchAsync(async function (req, res, next) {
   try {
      const { email, password } = req.body;

      /**
       * @userIsExists find the user is exists in a database or not if the user is exists in the database then we want to send back the user token and user information.
       * @return user information
       */

      const userIsExists = await userModel.findOne({ email });

      if (!userIsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'User is not exists',
         });
      }

      // TODO: Varify user
      // if the user email is valid then check the password is match or
      const varifyPassword = await bcryptjs.compare(password, userIsExists.password);

      if (varifyPassword) {
         /**
          * @genrateToken genrate new access token for the every admin login time is the admin is valid
          */
         const genrateToken = await userIsExists.genrateUserToken();

         const userObject = {
            name: userIsExists.name,
            email: userIsExists.email,
            isAdmin: userIsExists.isAdmin,
            userProfileImage: userIsExists.userProfileImage,
            token: genrateToken,
         };

         // set the user info into the cookie
         res.cookie('user', userObject);

         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            userObject,
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'User account password is not match',
         });
      }
   } catch (err) {
      console.log(err);
   }
});

const changeUserPassword = catchAsync(async function (req, res, next) {
   const { oldPassword, newPassword } = req.body;
   const { token } = req.params;
   // varify the user us valid or not.
   const { _id } = await tokenVarifyFunction(undefined, token);
   // find the user
   const findUser = await userModel.findOne({ _id });
   // check the user old password is match or not.
   const varifyPassword = await bcryptjs.compare(oldPassword, findUser.password);

   if (varifyPassword) {
      // old password and new password is not the same.
      if (newPassword === oldPassword) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "Old password and new password is't the same",
         });
      } else {
         // hash the new password
         const hashPassword = await bcryptjs.hash(newPassword, 11);
         // sotre the hash passowrd inside the database.
         const pwdRes = await userModel.updateOne({ _id }, { $set: { password: hashPassword } });
         if (!!pwdRes.modifiedCount) {
            return res.status(httpStatusCodes.CREATED).json({
               success: true,
               message: 'Password changed',
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
         message: 'Old password is not match',
      });
   }
});

module.exports = {
   signInUser,
   logInUser,
   changeUserPassword,
};
