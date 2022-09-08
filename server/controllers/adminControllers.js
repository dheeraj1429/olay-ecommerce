const userModel = require("../model/schema/userSchema");
const bcryptjs = require("bcryptjs");

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
            token: genrateToken,
         };

         res.cookie("user", userObject);

         return res.status(200).json({
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

module.exports = {
   adminSignIn,
};
