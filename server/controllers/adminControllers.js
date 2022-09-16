const productModel = require("../model/schema/productSchema");
const categoryModel = require("../model/schema/productCategorySchema");
const productBrandModel = require("../model/schema/productBrandSchema");
const { erroResponse } = require("./errorResponse");

const insertCategoryInfo = async function (data, res) {
   const newCategoryInsert = await categoryModel(data);
   const saveCategory = await newCategoryInsert.save();

   // TODO: Send back the responsive to the client
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
         erroResponse(res);
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

/**
 * @editproductCategory find the category and update then catefory fileds
 * @return flag true and false
 */
const editproductCategory = async function (req, res, next) {
   try {
      const { categoryId, name, description } = req.body;

      if (!categoryId) {
         return res.status(200).json({
            success: false,
            message: "no selected category",
         });
      }

      /**
       * @findCategoryAndUpdate find the category and update.
       */
      const findCategoryAndUpdate = await categoryModel.updateOne(
         { _id: categoryId },
         {
            $set: {
               name,
               description,
            },
         }
      );

      // TODO: check the update is done or not
      if (!!findCategoryAndUpdate.modifiedCount) {
         return res.status(200).json({
            success: true,
            message: "category information update",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @deleteSelectedCategory find the category and remove.
 * @return category delete succesful or not
 */
const deleteSelectedCategory = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         return res.status(200).json({
            success: false,
            message: "selected category is is required!!",
         });
      }

      /**
       * @findCategoryAndDelete find the category from the database using id and delete the category.
       */
      const findCategoryAndDelete = await categoryModel.deleteOne({ _id: id });

      if (!!findCategoryAndDelete.deletedCount) {
         return res.status(202).json({
            success: true,
            message: "category delete successful",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 *
 * @param {*} req
 * @returns response
 */
const sendBrandResponseFunction = function (res) {
   return res.status(200).json({
      success: true,
      message: "Product brand saved",
   });
};

/**
 * @insertNewProductBrand inert new brand information
 * @return produict barnd is successful inserted or not
 */
const insertNewProductBrand = async function (req, res, next) {
   try {
      const {
         name,
         description,
         website,
         order,
         brandStatusInfo,
         SEOTitle,
         SEODescription,
      } = req.body;
      const file = req.files[0];

      // TODO: function scope variables
      let insertBrandInfo, saveBrand;

      /**
       * @fileIsBrandIsExits first find the brand is already exists or not if the brand is already exists then return the flag || store the information into the database
       * @file { object } if there is new file then we want to store othre information into the database
       */
      // TODO: check the brand is exists or not
      const fileIsBrandIsExits = await productBrandModel.findOne({ name });

      if (fileIsBrandIsExits) {
         return res.status(200).json({
            success: false,
            message: "brand is already exists",
         });
      } else {
         if (file) {
            const originalname = file.originalname;

            insertBrandInfo = await productBrandModel({
               name,
               description,
               website,
               order,
               brandStatusInfo,
               SEOTitle,
               SEODescription,
               brandIcon: originalname,
            });

            saveBrand = await insertBrandInfo.save();

            if (saveBrand) {
               sendBrandResponseFunction(res);
            }
         } else {
            /**
             * @req.body = {} contains all information about product brand.
             */
            insertBrandInfo = await productBrandModel(req.body);
            saveBrand = insertBrandInfo.save();

            if (saveBrand) {
               sendBrandResponseFunction(res);
            }
         }
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @getAllProductBrand get all brand
 * @return send brand array of object to the client
 */
const getAllProductBrand = async function (req, res, next, perItems = undefined) {
   try {
      /**
       * @BRAND_LIMIT how many documents we want to return to the client
       * @page which page is client right now ?page=1 ......
       * @totalProductBrandSize how many document we have in a database.
       */
      const BRAND_LIMIT = perItems ? perItems : 3;
      const page = req.query.page || 0;
      const totalProductBrandSize = await productBrandModel.countDocuments({});

      /**
       * @getAllBrands find all the document from the database and return some limited document to the client. it's usefull to mane a pagination. if there is some problem then send the some error the the client
       */
      const getAllBrands = await productBrandModel
         .find({})
         .limit(BRAND_LIMIT)
         .skip(BRAND_LIMIT * page);

      if (!getAllBrands) {
         // TODO: send back error
         erroResponse(res);
      } else {
         return res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalProductBrandSize / BRAND_LIMIT - 1),
            totalDocuments: totalProductBrandSize,
            brands: getAllBrands,
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteOneProductBrand = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         return res.status(200).json({
            success: false,
            message: "selected brand product id is required",
         });
      }

      /**
       * @deleteBrand delete selected brand from the database
       */
      const deleteBrand = await productBrandModel.deleteOne({ _id: id });

      if (!!deleteBrand.deletedCount) {
         return res.status(200).json({
            success: true,
            message: "Product brand delete successful",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @deleteSelectedProductBrand delete selected products brands
 */
const deleteSelectedProductBrand = async function (req, res, next) {
   try {
      let deleteSelected;
      for (let i = 0; i < req.body.length; i++) {
         deleteSelected = await productBrandModel.deleteOne({ _id: req.body[i] });
      }

      if (!!deleteSelected.deletedCount) {
         return res.status(200).json({
            success: true,
            message: "Delete successful",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const getSelectedBrandProduct = async function (req, res, next) {
   try {
      const id = req.params.id;
      console.log(id);

      if (!id) {
         return res.status(200).json({
            success: false,
            message: "selected brand id is required",
         });
      }

      const findSelectedBrandProduct = await productBrandModel.findOne({ _id: id });

      if (findSelectedBrandProduct) {
         return res.status(200).json({
            success: true,
            selectedBrand: findSelectedBrandProduct,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @sendUpdateResponse send the successful responsce to the client
 */
const sendUpdateResponse = function (res) {
   return res.status(200).json({
      success: true,
      message: "Product brand information updated",
   });
};

/**
 * @editSelectedBrand update the selected product brand information
 * @return flag true || false
 */
const editSelectedBrand = async function (req, res, next) {
   try {
      const {
         name,
         description,
         website,
         order,
         brandStatusInfo,
         SEOTitle,
         SEODescription,
         id,
      } = req.body;

      const updateObject = {
         name,
         description,
         website,
         order,
         brandStatusInfo,
         SEOTitle,
         SEODescription,
      };

      const file = req.files[0];
      let updateSelectedProductBrand;

      /**
       * @file if the file is exists into the req.body then we want the update the files path alos into the database, othervise we only want to update the others fildes
       */
      if (file) {
         const originalname = file.originalname;
         updateObject.brandIcon = originalname;

         updateSelectedProductBrand = await productBrandModel.updateOne(
            { _id: id },
            {
               $set: updateObject,
            }
         );

         if (!!updateSelectedProductBrand.modifiedCount) {
            sendUpdateResponse(res);
         } else {
            erroResponse(res);
         }
      } else {
         updateSelectedProductBrand = await productBrandModel.updateOne(
            { _id: id },
            {
               $set: updateObject,
            }
         );

         if (!!updateSelectedProductBrand.modifiedCount) {
            sendUpdateResponse(res);
         } else {
            erroResponse(res);
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteAllProductBrand = async function (req, res, next) {
   try {
      /**
       * @deleteAllBrands delete all brands from the databse
       */
      const deleteAllBrands = await productBrandModel.deleteMany({});

      if (!!deleteAllBrands.deletedCount) {
         return res.status(200).json({
            success: true,
            message: "product brands delete successful",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

// const fetchProductBrandItems = async function (req, res, next) {
//    try {
//       const items = req.params.id;

//       if (!items) {
//          return res.status(200).json({
//             success: false,
//             message: "number ob brand items is required",
//          });
//       }

//       await getAllProductBrand(req, res, next, items);
//    } catch (err) {
//       console.log(err);
//    }
// };

const getProductBrands = async function (req, res, next) {
   try {
      const fetchProductBrandItems = await productBrandModel.find({}, { name: 1 });

      if (fetchProductBrandItems) {
         return res.status(200).json({
            success: true,
            brands: fetchProductBrandItems,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @saveProductInDb send back the reponse the the client
 */
const saveProductInDb = async function (object, res) {
   let insertProduct, saveProduct;
   insertProduct = await productModel(object);
   saveProduct = await insertProduct.save();

   if (saveProduct) {
      return res.status(201).json({
         success: true,
         message: "Product saved",
      });
   } else {
      erroResponse(res);
   }
};

const uploadNewProduct = async function (req, res, next) {
   try {
      const { name } = req.body;

      /**
       * @productObject { copy all the client send data }
       */
      const productObject = { ...req.body };

      /**
       * @checkIsProductIsExists check the product is already is exists or not
       */
      const checkIsProductIsExists = await productModel.findOne({ name });

      if (checkIsProductIsExists) {
         return res.status(200).json({
            success: true,
            message: "Product is already exists",
         });
      } else {
         /**
          * @originalname if the admin want the upload the image then we want to store the image information into the database
          */
         if (req.files && !!req.files.length) {
            const originalname = req.files[0].originalname;
            productObject.productImage = originalname;
            await saveProductInDb(productObject, res);
         } else {
            await saveProductInDb(productObject, res);
         }
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @fetchUploadProducts return products documents
 */
const fetchUploadProducts = async function (req, res, next) {
   try {
      const page = req.query.page;

      if (!page) {
         return res.status(200).json({
            success: false,
            message: "page id is required!",
         });
      }

      /**
       * @DOCUMENT_LIMIT how to document we want the send back to the client
       */
      const DOCUMENT_LIMIT = 3;
      const totalDocuments = await productModel.countDocuments({});
      const fetchDoc = await productModel
         .find({})
         .populate("category", { name: 1 })
         .populate("brand", { name: 1 })
         .limit(DOCUMENT_LIMIT)
         .skip(DOCUMENT_LIMIT * page);

      if (fetchDoc) {
         return res.status(200).json({
            success: true,
            totalPages: Math.ceil(totalDocuments / DOCUMENT_LIMIT - 1),
            totalDocuments: totalDocuments,
            products: fetchDoc,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteAllProducts = async function (req, res, next) {
   try {
      const deleteProducts = await productModel.deleteMany({});

      if (!!deleteProducts.deletedCount) {
         return res.status(200).json({
            success: true,
            message: "All products delete",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @deleteSelectedProducts delete selected produsts from the database
 */
const deleteSelectedProducts = async function (req, res, next) {
   try {
      let deleteSelected;

      if (!!req.body.length) {
         for (let i = 0; i < req.body.length; i++) {
            deleteSelected = await productModel.deleteOne({ _id: req.body[i] });
         }

         if (!!deleteSelected.deletedCount) {
            return res.status(200).json({
               success: true,
               message: "Selected products remove from the database",
            });
         } else {
            erroResponse(res);
         }
      } else {
         return res.status(200).json({
            success: false,
            message: "Selected id is required!!",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

module.exports = {
   uploadProductCategory,
   getAllCategorys,
   editproductCategory,
   deleteSelectedCategory,
   insertNewProductBrand,
   getAllProductBrand,
   deleteOneProductBrand,
   deleteSelectedProductBrand,
   getSelectedBrandProduct,
   editSelectedBrand,
   deleteAllProductBrand,
   // fetchProductBrandItems,
   getProductBrands,
   uploadNewProduct,
   fetchUploadProducts,
   deleteAllProducts,
   deleteSelectedProducts,
};
