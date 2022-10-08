const { catchAsync } = require("../helpers/helpers");
const fs = require("fs");
const { parse } = require("json2csv");
const productModel = require("../model/schema/productSchema");
const path = require("path");
const AppError = require("../helpers/appError");
const userModel = require("../model/schema/userSchema");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const { tokenVarifyFunction, productExportFolderPath, imageCompress } = require("../helpers/helpers");
const nodemailer = require("nodemailer");
const csv = require("csvtojson");
const fetch = require("node-fetch");

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
      const folderPath = productExportFolderPath(fileName);

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

   /**
    * @findAdminUser find the cookie login user and check is admin or not.
    * @return data
    */
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

   /**
    * @cookie check the user is login or not if there is not user then send back the response
    * @filePath find the file which we want to remove from the database or the folder.
    * Once admin is remove the files from the database history. we also remove the files from the folders.
    * @return flag flig successfully removed from database or the folders
    */
   const cookie = req.cookies;
   const filePath = productExportFolderPath(fileName);

   if (!!cookie && cookie.user && cookie.user.token) {
      const { _id } = tokenVarifyFunction(cookie);

      const findUserAndRemoveSingleHistory = await userModel.updateOne(
         { _id },
         { $pull: { exportsHistory: { _id: id } } }
      );

      if (findUserAndRemoveSingleHistory.acknowledged && !!findUserAndRemoveSingleHistory.modifiedCount) {
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

const downloadPrevHistoryFiles = catchAsync(async function (req, res, next) {
   const { fileName } = req.query;

   if (!fileName) {
      next(new AppError("History filename is required"));
   }
   const filePath = productExportFolderPath(fileName);

   res.download(path.join(filePath), (err) => {
      if (err) console.log(err);
   });
});

const sendHistoryFileWithEmail = catchAsync(async function (req, res, next) {
   const { email, file } = req.body;

   if (email && file) {
      /**
       * @filePath for check the file is exists or not if the file is exists then send the file into the selected mail.
       * @mail mail config object.
       * @mailOptions send mail config object.
       * @return send back response.
       */
      const filePath = productExportFolderPath(file);
      const mail = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.EMAIL,
            pass: process.env.APPPASSWORD,
         },
      });

      const mailOptions = {
         from: process.env.EMAIL,
         to: email,
         subject: "Received files history",
         attachments: [
            {
               fileName: file,
               path: filePath,
            },
         ],
      };

      mail.sendMail(mailOptions, function (error, info) {
         if (error) next(new AppError(error));

         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: info.response,
         });
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         message: "please fill all fileds",
      });
   }
});

const downloadCsvTemplate = catchAsync(async function (req, res, next) {
   const filePath = productExportFolderPath("template.csv");
   if (filePath) {
      res.download(path.join(filePath), (err) => {
         if (err) console.log(err);
      });
   } else {
      next(new AppError("File not found"));
   }
});

const deleteObjectKey = function (csvToJsonData, key) {
   if (!csvToJsonData[key]) {
      delete csvToJsonData[key];
   }
};

const ImportCsvFileComponent = catchAsync(async function (req, res, next) {
   const file = req.files[0];
   const skipDocuments = [];
   const insertDocuments = [];

   if (!file) {
      next(new AppError("Import csv file is required!"));
   }

   const originalname = file.originalname;
   const filePath = path.join(__dirname, "..", "dataFiles", "importData", "Products", originalname);

   /**
    * upload the csv file into the backend foleds.
    * then convert the csv into the json formate.
    */
   const csvToJsonData = await csv().fromFile(filePath);

   /**
    * check the products is already exists or not. if the products data is exists then skip into the next product data.
    */

   for (let i = 0; i < csvToJsonData.length; i++) {
      const productName = csvToJsonData[i].name;

      const productIsExits = await productModel.findOne({ name: productName });

      if (!productIsExits) {
         if (!csvToJsonData[i].category) {
            deleteObjectKey(csvToJsonData[i], "category");
         }

         if (!csvToJsonData[i].brand) {
            deleteObjectKey(csvToJsonData[i], "brand");
         }

         if (!csvToJsonData[i].variations) {
            deleteObjectKey(csvToJsonData[i], "variations");
         }

         if (!csvToJsonData[i].createdAt) {
            deleteObjectKey(csvToJsonData[i], "createdAt");
         }

         if (!!csvToJsonData[i]?.productImage) {
            /**
             * if the image filed is not empty then.
             * first download the image from the google.
             * store the downloded file into the images downloaded folder.
             * then compress the image file and the save imagefile name into the database document.
             * grab the last name of the image and insert into the database product document.
             */
            const productImage = csvToJsonData[i].productImage;
            const imageNameAr = productImage.split("/");
            const imageName = imageNameAr[imageNameAr.length - 1];

            /**
             * first check the image is already exists or not. if the image the exists then skip the download
             * section.
             */
            const imagePath = path.join(__dirname, "..", "upload", "productImages", imageName);

            fs.exists(imagePath, (exists) => {
               if (exists) {
                  console.log("file exists");
               } else {
                  const response = fetch(productImage).then((resp) => resp.buffer());
                  response.then((data) => {
                     fs.writeFile(imagePath, data, async (err) => {
                        if (err) {
                           next(new AppError(err));
                        }

                        await imageCompress(imagePath, 130, "productImagesCompress", imageName);
                     });
                  });
               }
            });

            csvToJsonData[i].productImage = imageName;
         }

         const insertData = await productModel(csvToJsonData[i]).save();

         if (insertData) {
            insertDocuments.push({ _id: insertData._id, name: insertData.name });
         }
      } else {
         skipDocuments.push({ _id: productIsExits._id, name: productName });
      }
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      insertInfo: {
         skipDocuments,
         insertDocuments,
      },
   });
});

module.exports = {
   getAllProductCsv,
   getAllExportInfo,
   deleteSingleProductHistory,
   downloadPrevHistoryFiles,
   sendHistoryFileWithEmail,
   downloadCsvTemplate,
   ImportCsvFileComponent,
};
