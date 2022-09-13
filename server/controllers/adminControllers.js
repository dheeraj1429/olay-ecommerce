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
const getAllProductBrand = async function (req, res, next) {
   try {
      /**
       * @BRAND_LIMIT how many documents we want to return to the client
       * @page which page is client right now ?page=1 ......
       * @totalProductBrandSize how many document we have in a database.
       */
      const BRAND_LIMIT = 3;
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
      success: false,
      message: "Product brand information updated",
   });
};

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
         }
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
};
