const { catchAsync, downloadImageFromWeb, numberConvert } = require("../helpers/helpers");
const fs = require("fs");
const { parse } = require("json2csv");
const productModel = require("../model/schema/productSchema");
const path = require("path");
const AppError = require("../helpers/appError");
const userModel = require("../model/schema/userSchema");
const categoryModel = require("../model/schema/productCategorySchema");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const { tokenVarifyFunction, productExportFolderPath } = require("../helpers/helpers");
const nodemailer = require("nodemailer");
const csv = require("csvtojson");
const productBrandModel = require("../model/schema/productBrandSchema");
const mongoose = require("mongoose");

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

      const findProduct = await productModel.find({}).populate("category", { _id: 0, products: 0, __v: 0 }).populate("brand", { _id: 0, products: 0, __v: 0 });

      const fields = [
         "name",
         "price",
         "salePrice",
         "discription",
         "category.name",
         "category.description",
         "stockStatus",
         "weight",
         "length",
         "wide",
         "height",
         "productImage",
         "suggestedAge",
         "brand.name",
         "brand.description",
         "brand.website",
         "brand.order",
         "brand.brandStatusInfo",
         "brand.brandIcon",
         "brand.SEOTitle",
         "brand.SEODescription",
         "createdAt",
         "productStatusInfo",
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

      const findUserAndRemoveSingleHistory = await userModel.updateOne({ _id }, { $pull: { exportsHistory: { _id: id } } });

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

const convertUrlToName = function (url) {
   /**
    * covert url to the array first https://www/image.jpg => [https, www, image.jpg]
    * grab the last index of the array
    * @return imageName from the function.
    */
   const imageNameAr = url.split("/");
   const imageName = imageNameAr[imageNameAr.length - 1];
   return imageName;
};

const insertProductIdIntoTheCollections = async function (collection, collectionId, product_id) {
   try {
      const checkIsProductAlreadyExists = await collection.findOne({
         _id: collectionId,
         "products.productId": product_id,
      });

      if (!checkIsProductAlreadyExists) {
         await collection.updateOne({ _id: collectionId }, { $push: { products: { productId: product_id } } });
      }
   } catch (err) {
      console.log(err);
   }
};

const ImportCsvFileComponent = catchAsync(async function (req, res, next) {
   const file = req.files[0];

   /**
    * keep track how much document inserted or how much document is skiped.
    */
   const skipDocuments = [];
   const insertDocuments = [];
   const brandsInserted = [];
   const brandsSkiped = [];
   const categoryinserted = [];
   const categorySkiped = [];

   // track the brand and the category id which document is inserted into the database.
   let brand_id, category_id;

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

   for (let i = 0; i < csvToJsonData.length; i++) {
      const productName = csvToJsonData[i].name;

      if (csvToJsonData[i]?.brand?.name) {
         const brandIsExists = await productBrandModel.findOne({ name: csvToJsonData[i].brand.name });

         if (!brandIsExists) {
            let brandIconUrl = csvToJsonData[i]?.brand?.brandIcon;

            if (!!brandIconUrl) {
               const imageName = convertUrlToName(brandIconUrl);
               const imagePath = path.join(__dirname, "..", "upload", "brandImages", imageName);
               await downloadImageFromWeb(brandIconUrl, imagePath, "brandImagesCompress", imageName);
               csvToJsonData[i].brand.brandIcon = imageName;
            }

            const brandObjectInfo = {
               name: csvToJsonData[i].brand.name,
               description: csvToJsonData[i].brand.description,
               website: csvToJsonData[i].brand.website,
               order: !!csvToJsonData[i].brand?.order ? csvToJsonData[i].brand.order : 0,
               brandStatusInfo: !!csvToJsonData[i].brand.brandStatusInfo ? csvToJsonData[i].brand.brandStatusInfo : "Draft",
               brandIcon: csvToJsonData[i].brand.brandIcon,
               SEOTitle: csvToJsonData[i].brand.SEOTitle,
               SEODescription: csvToJsonData[i].brand.SEODescription,
            };

            const insertProductBrand = await productBrandModel(brandObjectInfo).save();

            if (insertProductBrand) {
               brand_id = insertProductBrand._id;
               brandsInserted.push({ name: insertProductBrand.name, _id: insertProductBrand._id });
            }
         } else {
            brand_id = brandIsExists._id;
            brandsSkiped.push({ name: brandIsExists.name, _id: brandIsExists._id });
         }
      }

      if (csvToJsonData[i]?.category?.name) {
         const categoryIsExists = await categoryModel.findOne({ name: csvToJsonData[i].category.name });

         if (!categoryIsExists) {
            const categoryObjectInfo = {
               name: csvToJsonData[i].category.name,
               description: csvToJsonData[i].category.description,
            };

            const insertCategory = await categoryModel(categoryObjectInfo).save();

            if (insertCategory) {
               category_id = insertCategory._id;
               categoryinserted.push({ name: insertCategory.name, _id: insertCategory._id });
            }
         } else {
            category_id = categoryIsExists._id;
            categorySkiped.push({ name: categoryIsExists.name, _id: categoryIsExists._id });
         }
      }

      /**
       * check the products is already exists or not. if the products data is exists then skip into the next product data.
       */
      if (csvToJsonData[i].name) {
         const productIsExits = await productModel.findOne({ name: productName });

         if (!productIsExits) {
            // urls
            let url = csvToJsonData[i]?.productImage;

            /**
             * if the json object contains the image url then download images from the web.
             * but first check the images is exists or not. after that download images from the web.
             */
            if (!!url) {
               const imageName = convertUrlToName(url);
               const imagePath = path.join(__dirname, "..", "upload", "productImages", imageName);
               await downloadImageFromWeb(url, imagePath, "productImagesCompress", imageName);
               csvToJsonData[i].productImage = imageName;
            }

            /**
             * once images download from the web.
             * all fileds url converted into the original image urls. the last step is the grab the data from the json.
             * inserted all the data into the database.
             * Note => first check which collection data we want to inserted. like product document has product json data.
             * brands data will be inserted into the brand collection.
             * category data will be inserted into the category collection.
             * make sure all the data is inserted successfully.
             * also check how much data is inserted. which data is skiped or which is inserted.
             * once all data is inserted make sure if the json data containes. category or brand data. then make the refrence of the id into the product.
             */

            // insert product info.
            const productInfoObject = {
               name: csvToJsonData[i].name,
               price: numberConvert(csvToJsonData[i].price),
               salePrice: numberConvert(csvToJsonData[i].salePrice),
               discription: csvToJsonData[i].discription,
               stockStatus: csvToJsonData[i].stockStatus,
               weight: !!csvToJsonData[i].weight ? csvToJsonData[i].weight : 0,
               length: !!csvToJsonData[i].length ? csvToJsonData[i].length : 0,
               wide: !!csvToJsonData[i].wide ? csvToJsonData[i].wide : 0,
               height: !!csvToJsonData[i].height ? csvToJsonData[i].height : 0,
               productImage: csvToJsonData[i].productImage,
               suggestedAge: csvToJsonData[i].suggestedAge,
               productStatusInfo: !!csvToJsonData[i].productStatusInfo ? csvToJsonData[i].productStatusInfo : "Draft",
            };

            if (csvToJsonData[i].brand.name) {
               productInfoObject.brand = brand_id;
            }

            if (csvToJsonData[i].category.name) {
               productInfoObject.category = category_id;
            }

            const insertData = await productModel(productInfoObject).save();

            if (insertData) {
               insertDocuments.push({ _id: insertData._id, name: insertData.name });

               /**
                * if json data containes the product name, or the product is not exists into the database.
                * if the product data is successfully inserted then grab the product is and push the id into.
                * the category or the brand collections also.
                */

               if (csvToJsonData[i].brand.name && brand_id) {
                  await insertProductIdIntoTheCollections(productBrandModel, brand_id, insertData._id);
               }

               if (csvToJsonData[i].category.name && category_id) {
                  await insertProductIdIntoTheCollections(categoryModel, category_id, insertData._id);
               }
            }
         } else {
            product_id = productIsExits._id;
            skipDocuments.push({ _id: productIsExits._id, name: productName });
         }
      }
   }

   return res.status(httpStatusCodes.OK).json({
      success: true,
      uploadInfo: {
         skipDocuments,
         insertDocuments,
         brandsInserted,
         brandsSkiped,
         categoryinserted,
         categorySkiped,
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
