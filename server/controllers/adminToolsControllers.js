const { catchAsync } = require("../helpers/helpers");
const fs = require("fs");
const { parse } = require("json2csv");
const productModel = require("../model/schema/productSchema");
const path = require("path");
const AppError = require("../helpers/appError");
const userModel = require("../model/schema/userSchema");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const { tokenVarifyFunction } = require("../helpers/helpers");

const getAllProductCsv = catchAsync(async function (req, res, next) {
   /**
    * Find, which user is export the history.
    * if the user is admin then we can allow the user can export the data.
    * Store the date, name, others information into the user database, for the history.
    * when the files is converted then make a download link.
    * if the file converted successfully then download the file automatic.
    */

   const cookie = req.cookies;

   if (!!cookie && cookie.user && cookie.user.token) {
      const { _id, isAdmin } = tokenVarifyFunction(cookie);

      if (isAdmin !== "admin") {
         return res.status(httpStatusCodes.OK).json({
            message: "This feature is not working for the user is only made for the admin.",
         });
      }

      const findProduct = await productModel
         .find({})
         .populate("category", { _id: 0, products: 0, __v: 0 })
         .populate("brand", { _id: 0, products: 0, __v: 0 });

      const fields = [
         "_id",
         "name",
         "price",
         "salePrice",
         "discription",
         "category",
         "stockStatus",
         "weight",
         "length",
         "wide",
         "height",
         "productImage",
         "suggestedAge",
         "brand",
         "createdAt",
         "productStatusInfo",
         "variations",
      ];

      const opts = { fields };
      const csv = parse(findProduct, opts);
      /**
       * @uniqueID for the export file unique name.
       */
      const uniqueID = Date.now().toString(36) + Math.random().toString(36).split(".").join("");
      const fileName = `products${uniqueID}.csv`;
      const folderPath = path.join(__dirname, "..", "exportData", "Products", fileName);

      fs.writeFile(folderPath, csv, function (err, data) {
         if (err) {
            next(new AppError(err));
         }

         userModel
            .updateOne(
               { _id },
               {
                  $push: {
                     exportsHistory: {
                        historyType: "product history",
                        fileName: fileName,
                        exportProducts: findProduct.length,
                     },
                  },
               }
            )
            .then((response) => {
               if (!!response.modifiedCount) {
                  res.download(path.join(folderPath), (err) => {
                     if (err) console.log(err);
                  });
               }
            });
      });
   } else {
      res.status(httpStatusCodes.OK).json({
         message: "Login user is reuqired",
      });
   }
});

const getAllExportInfo = catchAsync(async function (req, res, next) {
   const cookie = req.cookies;

   if (cookie && cookie?.user && cookie?.user.token) {
      const { _id, isAdmin } = tokenVarifyFunction(cookie);

      if (isAdmin === "admin") {
         const findAdminUser = await userModel.findOne({ _id });

         const responseData = {
            exportsHistory: findAdminUser.exportsHistory,
         };

         if (!findAdminUser) {
            return res.status(httpStatusCodes.OK).json({
               message: "No admin user found!",
            });
         }

         return res.status(httpStatusCodes.OK).json({
            success: true,
            history: responseData,
         });
      }
   }
});

const deleteSingleProductHistory = catchAsync(async function (req, res, next) {
   const { id, fileName } = req.params;

   if (!id) {
      next(new AppError("History id is reuqired"));
   }

   const cookie = req.cookies;
   const filePath = path.join(__dirname, "..", "exportData", "Products", fileName);

   if (!!cookie && cookie.user && cookie.user.token) {
      const { _id } = tokenVarifyFunction(cookie);

      const findUserAndRemoveSingleHistory = await userModel.updateOne(
         { _id },
         { $pull: { exportsHistory: { _id: id } } }
      );

      if (
         findUserAndRemoveSingleHistory.acknowledged &&
         !!findUserAndRemoveSingleHistory.modifiedCount
      ) {
         fs.unlink(filePath, function (err) {
            if (err) {
               console.log(err);
            }

            res.status(httpStatusCodes.OK).json({
               success: true,
               message: "history deleted",
            });
         });
      }
   }
});

module.exports = {
   getAllProductCsv,
   getAllExportInfo,
   deleteSingleProductHistory,
};
