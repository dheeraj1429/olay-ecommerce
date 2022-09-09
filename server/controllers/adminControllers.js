const productModel = require("../model/schema/productSchema");
const userModel = require("../model/schema/userSchema");
const bcryptjs = require("bcryptjs");
const categoryModel = require("../model/schema/productCategorySchema");

// admin login
const adminSignIn = async function (req, res, next) {
   try {
      const { email, password } = req.body;

      /**
       * @userIsExists find the user is exists in a database or not if the user is exists in the database then we want to send back the user token and user information.
       * @return user information
       */

      const userIsExists = await userModel.findOne({ email });

      if (!userIsExists) {
         return res.status(200).json({
            success: false,
            message: "User is not exists",
         });
      }

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
         res.cookie("user", userObject);

         return res.status(201).json({
            success: true,
            userObject,
         });
      } else {
         return res.status(200).json({
            success: false,
            message: "User account password is not match",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const insertCategoryInfo = async function (data, res) {
   const newCategoryInsert = await categoryModel(data);
   const saveCategory = await newCategoryInsert.save();

   if (saveCategory) {
      return res.status(201).json({
         success: true,
         message: "category saved",
      });
   }
};

const uploadProductCategory = async function (req, res, next) {
   try {
      const { categoryName, categoryDescription } = req.body;

      if (!!categoryName) {
         const isExists = await categoryModel.findOne({ name: categoryName });

         /**
          * @isExists first check the category is exists or not if the category is exists then we want the return the flag true and false. if there is not category is not exists then we want to create first then return the flag to the client.
          */
         if (isExists) {
            return res.status(200).json({
               success: false,
               message: "category is already exists",
            });
         } else {
            if (categoryName && categoryDescription) {
               const data = {
                  name: categoryName,
                  description: categoryDescription,
               };

               await insertCategoryInfo(data, res);
            } else if (categoryName) {
               const data = {
                  name: categoryName,
               };

               await insertCategoryInfo(data, res);
            }
         }
      } else {
         return res.status(200).json({
            success: false,
            message: "category name is required",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const getAllCategorys = async function (req, res, next) {
   try {
      /**
       * @getAllCategorys find all product categorys
       * @return return all the category
       */
      const getAllCategorys = await categoryModel.find({});

      if (!getAllCategorys) {
         return res.status(400).json({
            message: "someting worng",
         });
      } else {
         return res.status(200).json({
            success: true,
            allCategory: getAllCategorys,
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const editproductCategory = async function (req, res, next) {
   try {
      console.log(req.body);
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   adminSignIn,
   uploadProductCategory,
   getAllCategorys,
   editproductCategory,
};
