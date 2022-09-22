const productModel = require("../model/schema/productSchema");
const categoryModel = require("../model/schema/productCategorySchema");
const productBrandModel = require("../model/schema/productBrandSchema");
const productsTagsModel = require("../model/schema/productsTagsSchema");
const { erroResponse } = require("./errorResponse");
const { imageCompress } = require("../helpers/helpers");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const swatchesModel = require("../model/schema/productVariationSwatchesSchema");
const productSizeVariationModel = require("../model/schema/productSizeVariationSchema");

const insertCategoryInfo = async function (data, res) {
   const newCategoryInsert = await categoryModel(data);
   const saveCategory = await newCategoryInsert.save();

   // TODO: Send back the responsive to the client
   if (saveCategory) {
      return res.status(httpStatusCodes.CREATED).json({
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
            return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
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
      const name = req.params.id;

      if (!name) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "selected category is is required!!",
         });
      }

      /**
       * @findCategoryAndDelete find the category from the database using id and delete the category.
       */
      const findCategoryAndDelete = await categoryModel.deleteOne({ name: name });

      if (!!findCategoryAndDelete.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
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
   return res.status(httpStatusCodes.OK).json({
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
      const { name, description, website, order, brandStatusInfo, SEOTitle, SEODescription } = req.body;
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
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "brand is already exists",
         });
      } else {
         if (file) {
            const originalname = file.originalname;
            const imagePath = file.path;

            await imageCompress(imagePath, 200, "brandImagesCompress", originalname);

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
      const BRAND_LIMIT = perItems ? perItems : 10;
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
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "selected brand product id is required",
         });
      }

      /**
       * @deleteBrand delete selected brand from the database
       */
      const deleteBrand = await productBrandModel.deleteOne({ _id: id });

      if (!!deleteBrand.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
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

      /**
       * loop over the all selected id, [id1, id2, id3] and then delete one by one product brand documents. if the document delete successfully then send back the resposnse to the client.
       * @return flag
       */
      for (let i = 0; i < req.body.length; i++) {
         deleteSelected = await productBrandModel.deleteOne({ _id: req.body[i] });
      }

      if (!!deleteSelected.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "selected brand id is required",
         });
      }

      const findSelectedBrandProduct = await productBrandModel.findOne({ _id: id });

      if (findSelectedBrandProduct) {
         return res.status(httpStatusCodes.OK).json({
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

const updateFildes = async function (id, updateObject, res) {
   const updateInfo = await productBrandModel.updateOne(
      { _id: id },
      {
         $set: updateObject,
      }
   );
   if (!!updateInfo.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product brand information updated",
      });
   } else {
      erroResponse(res);
   }
};

/**
 * @editSelectedBrand update the selected product brand information
 * @return flag true || false
 */
const editSelectedBrand = async function (req, res, next) {
   try {
      const { name, description, website, order, brandStatusInfo, SEOTitle, SEODescription, id } = req.body;

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

      /**
       * @file if the file is exists into the req.body then we want the update the files path alos into the database, othervise we only want to update the others fildes
       */
      if (file) {
         const originalname = file.originalname;
         updateObject.brandIcon = originalname;
         const imagePath = file.path;

         await imageCompress(imagePath, 200, "brandImagesCompress", originalname);

         updateSelectedProductBrand = updateFildes(id, updateObject, res);
      } else {
         updateSelectedProductBrand = updateFildes(id, updateObject, res);
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
         return res.status(httpStatusCodes.OK).json({
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

const getProductBrands = async function (req, res, next) {
   try {
      const fetchProductBrandItems = await productBrandModel.find({}, { name: 1 });

      if (fetchProductBrandItems) {
         return res.status(httpStatusCodes.OK).json({
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
      return res.status(httpStatusCodes.CREATED).json({
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

      console.log(req.body);

      /**
       * @productObject { copy all the client send data }
       */
      const productObject = { ...req.body };
      // productObject.tags = JSON.parse(productObject.tags);

      /**
       * @checkIsProductIsExists check the product is already is exists or not
       */
      const checkIsProductIsExists = await productModel.findOne({ name });

      if (checkIsProductIsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product is already exists",
         });
      } else {
         /**
          * @originalname if the admin want the upload the image then we want to store the image information into the database
          */
         if (req.files && !!req.files.length) {
            const originalname = req.files[0].originalname;
            const imagePath = req.files[0].path;

            await imageCompress(imagePath, 400, "productImagesCompress", originalname);

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
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "page id is required!",
         });
      }

      /**
       * @DOCUMENT_LIMIT how to document we want the send back to the client
       */
      const DOCUMENT_LIMIT = 6;
      const totalDocuments = await productModel.countDocuments({});
      const fetchDoc = await productModel
         .find({})
         .populate("category", { name: 1 })
         .populate("brand", { name: 1 })
         .limit(DOCUMENT_LIMIT)
         .skip(DOCUMENT_LIMIT * page);

      if (fetchDoc) {
         return res.status(httpStatusCodes.OK).json({
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
         return res.status(httpStatusCodes.OK).json({
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
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Selected products remove from the database",
            });
         } else {
            erroResponse(res);
         }
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "Selected id is required!!",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

/**
 * @deleteOneProduct delete one selected products from the database
 * @return if the products is successfully deleted ten send back the true response || send false response.
 */
const deleteOneProduct = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "product id is required!",
         });
      }

      const deleteProduct = await productModel.deleteOne({ _id: id });

      if (!!deleteProduct.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product removed from the database",
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const fetchSingleProduct = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "product id is required!",
         });
      }

      const findSingleProduct = await productModel.findOne({ _id: id }).populate("category", { name: 1 }).populate("brand", { name: 1 }).populate("tags._id", { name: 1 });

      if (findSingleProduct) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            product: findSingleProduct,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const editSingleProduct = async function (req, res, next) {
   try {
      const id = req.params.id;
      const file = req.files[0];

      if (!id) {
         return res.status(httpStatusCodes.OK).json({
            success: false,
            message: "Product id is required!",
         });
      }

      const updateObjectInfo = { ...req.body };
      // updateObjectInfo.tag = JSON.parse(editSingleProduct.tags);

      // if there is the file uploded then upload new file name and store into the database, but if there is no image updated then update only the new information.
      if (file?.originalname) {
         updateObjectInfo.productImage = file.originalname;
         const imagePath = file.path;
         const originalname = file.originalname;

         await imageCompress(imagePath, 400, "productImagesCompress", originalname);
      }

      const updateProductInfo = await productModel.updateOne({ _id: id }, { $set: updateObjectInfo });

      // if the database information is updated then return the status of the products
      if (!!updateProductInfo.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product update",
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "All fileds are the same. Already updated",
         });
      }
   } catch (err) {
      console.log(err);
   }
};
/**
 * @insertNewProductTag insert new tags into the database if the tag is not exists. the product tag is already exists then return the response to the client.
 */
const insertNewProductTag = async function (req, res, next) {
   try {
      const { name, description, status } = req.body;

      if (!name) {
         throw new Error("name is required");
      } else {
         /**
          * @checkIsTagExists check the product tag is alrady present into the database
          */
         const checkIsTagExists = await productsTagsModel.findOne({ name });

         if (checkIsTagExists) {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "product tag is already exists",
            });
         } else {
            const insertNewTag = await productsTagsModel({
               name,
               description,
               status,
            });

            const saveTag = await insertNewTag.save();

            if (saveTag) {
               return res.status(httpStatusCodes.CREATED).json({
                  success: true,
                  message: "Product tag saved",
               });
            } else {
               erroResponse(res);
            }
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const getAllProductTags = async function (req, res, next) {
   try {
      const page = req.query.page;

      if (!page) {
         throw new Error("Page number is required");
      }

      /*
      send back the limited document, for the pagiantion effect. when the client requrest for the next 6 documents then we want to skip the first 6 documents.
      */
      const DOCUMENT_LIMIT = 10;
      const totalDocuments = await productsTagsModel.countDocuments({});
      const allTags = await productsTagsModel
         .find({})
         .limit(DOCUMENT_LIMIT)
         .skip(DOCUMENT_LIMIT * page);

      if (allTags) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            totalPages: Math.ceil(totalDocuments / DOCUMENT_LIMIT - 1),
            totalDocuments: totalDocuments,
            tags: allTags,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteAllProductTags = async function (req, res, next) {
   try {
      const deleteAllTags = await productsTagsModel.deleteMany({});
      if (!!deleteAllTags.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "All products tags deleted",
         });
      } else {
         throw new Error("Somthing worng!");
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteSelectedTag = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("id is required!");
      }

      /**
       * @deleteTag delete selected product tag.
       * @error if there is no selected product tag id then thorw an error
       * @return flag
       */
      const deleteTag = await productsTagsModel.deleteOne({ _id: id });

      if (!!deleteTag.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product tag removed from the database",
         });
      } else {
         throw new Error("Somting worng");
      }
   } catch (err) {
      console.log(err);
   }
};

const getSelectedProductTag = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("id is required!");
      }

      const productTag = await productsTagsModel.findOne({ _id: id });

      if (productTag) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            tag: productTag,
         });
      } else {
         erroResponse(res);
      }
   } catch (err) {
      console.log(err);
   }
};

const udpateProductTag = async function (req, res, next) {
   try {
      const { id, name, description, status } = req.body;

      if (!id) {
         throw new Error("Id is required!");
      }

      /**
       * @updateProductTag update product tags info
       */
      const updateProductTag = await productsTagsModel.updateOne(
         { _id: id },
         {
            $set: {
               name,
               description,
               status,
            },
         }
      );

      if (!!updateProductTag.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product tag updated",
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product tag updated already",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const getAllProductTagsDocuments = async function (req, res, next) {
   try {
      const findAllProductTags = await productsTagsModel.find({}, { name: 1, status: 1 });

      if (findAllProductTags) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            allTags: findAllProductTags,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "Server Error!",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const insertNewProductSwatches = async function (req, res, next) {
   try {
      const { name, slug, description, color } = req.body;

      if (!name) {
         throw new Error("name is reuqired!");
      }

      /**
       * @isProductSwatchesExists check the product swatches is alrady exists or not if the product swatches is exists then return the flag || inert new product color swatches
       */
      const isProductSwatchesExists = await swatchesModel.findOne({ name });

      if (isProductSwatchesExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "product variation is already exists",
         });
      } else {
         const insertNewSwatches = await swatchesModel({
            name,
            slug,
            description,
            colorCode: color,
         });

         const saveIndb = await insertNewSwatches.save();

         if (saveIndb) {
            return res.status(httpStatusCodes.CREATED).json({
               success: true,
               message: "product variation saved",
            });
         } else {
            throw new Error("Somting worng");
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const getAllProductSwatches = async function (req, res, next) {
   try {
      const getAllSwatches = await swatchesModel.find({});

      if (getAllSwatches) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            allSwatches: getAllSwatches,
         });
      } else {
         throw new Error("Someting worng");
      }
   } catch (err) {
      console.log(err);
   }
};

const removeAllProductsSwatches = async function (req, res, next) {
   try {
      const removeSwatches = await swatchesModel.deleteMany({});

      if (!!removeSwatches.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "All products swatches deleted",
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "no more products swatches!",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const fetchSingleSwatchs = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("product swatches id is required!");
      }

      const findSelectedProductSwatches = await swatchesModel.findOne({ _id: id });

      if (findSelectedProductSwatches) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            selectedSwatches: findSelectedProductSwatches,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "server error",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const editSingleProductSwatches = async function (req, res, next) {
   try {
      const { id, name, slug, description, color } = req.body;

      if (!id) {
         throw new Error("product update swatches id is required!");
      }

      const updateProductSwatches = await swatchesModel.updateOne(
         { _id: id },
         {
            $set: {
               name,
               slug,
               description,
               colorCode: color,
            },
         }
      );

      if (!!updateProductSwatches.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "product swatches color updated",
         });
      } else {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "product swatches color already updated",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const removeSelectedProductSwatches = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("product swatches id is required!");
      }

      const deleteSelectedSwatches = await swatchesModel.deleteOne({ _id: id });

      if (!!deleteSelectedSwatches.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "product swatches delete",
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "inertnal server error",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const insertNewProductSizeVairation = async function (req, res, next) {
   try {
      const { name, slug, description } = req.body;

      if (!name) {
         throw new Error("name is reuqired!");
      }

      const checkSizeVariationIsExists = await productSizeVariationModel.findOne({ name });

      if (checkSizeVariationIsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product size variation already exists",
         });
      } else {
         const insertNewVarient = await productSizeVariationModel({
            name,
            slug,
            description,
         });

         const saveVariation = await insertNewVarient.save();

         if (saveVariation) {
            return res.status(httpStatusCodes.CREATED).json({
               success: true,
               message: "Product size variation saved",
            });
         } else {
            return res.status(httpStatusCodes.INTERNAL_SERVER).json({
               message: "inertnal server error",
            });
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const getAllProductSizeVariations = async function (req, res, next) {
   try {
      const allSizeVaraitions = await productSizeVariationModel.find({});

      if (allSizeVaraitions) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            sizeVariations: allSizeVaraitions,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "Inter server error",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const removeSingleProductSizeVariation = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("id is required");
      }

      const deleteSelectedSize = await productSizeVariationModel.deleteOne({ _id: id });

      if (!!deleteSelectedSize.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product size variation removed form the database",
         });
      } else {
         throw new Error("Somting worng with the size variations!!");
      }
   } catch (err) {
      console.log(err);
   }
};

const deleteAllProductSizeVations = async function (req, res, next) {
   try {
      const deleteSizes = await productSizeVariationModel.deleteMany({});

      if (!!deleteSizes.deletedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product size variation removed form the database",
         });
      } else {
         throw new Error("Somting worng with the size variations!!");
      }
   } catch (err) {
      console.log(err);
   }
};

const getSingleProductSizeVations = async function (req, res, next) {
   try {
      const id = req.params.id;

      if (!id) {
         throw new Error("id is required");
      }

      const findSizeVariation = await productSizeVariationModel.findOne({ _id: id });

      if (findSizeVariation) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            variation: findSizeVariation,
         });
      } else {
         throw new Error("Somting worng with the size variations!!");
      }
   } catch (err) {
      console.log(err);
   }
};

const editSingleSizeVariation = async function (req, res, next) {
   try {
      const { id } = req.body;

      /**
       * id is must if there is no id filed then throw new error,
       * find the dooucment using the id, make also the new index of the document.
       * @isVariationsExists first find the updated name is exists or not if the product size variation name is exists then send back the reposnse to the client.
       * check the fileds are update or not then send back the flag to the client.
       */

      if (!id) {
         throw new Error("id is required");
      }

      const isVariationsExists = await productSizeVariationModel.findOne({ name: req.body.name });

      if (isVariationsExists) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Size variation is alrady exists",
         });
      } else {
         const findSizeVariation = await productSizeVariationModel.updateOne(
            { _id: id },
            {
               $set: {
                  name: req.body.name,
                  slug: req.body.slug,
                  description: req.body.description,
               },
            }
         );

         if (!!findSizeVariation.matchedCount) {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Product size variation updated",
            });
         } else {
            return res.status(httpStatusCodes.OK).json({
               success: true,
               message: "Product size variation already updated",
            });
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const insertSelectedProductVariation = async function (req, res, next) {
   try {
      // to be continue
      console.log(req.body);
      console.log(req.files);
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
   getProductBrands,
   uploadNewProduct,
   fetchUploadProducts,
   deleteAllProducts,
   deleteSelectedProducts,
   deleteOneProduct,
   fetchSingleProduct,
   editSingleProduct,
   insertNewProductTag,
   getAllProductTags,
   deleteAllProductTags,
   deleteSelectedTag,
   getSelectedProductTag,
   udpateProductTag,
   getAllProductTagsDocuments,
   insertNewProductSwatches,
   getAllProductSwatches,
   removeAllProductsSwatches,
   fetchSingleSwatchs,
   editSingleProductSwatches,
   removeSelectedProductSwatches,
   insertNewProductSizeVairation,
   insertSelectedProductVariation,
   getAllProductSizeVariations,
   removeSingleProductSizeVariation,
   deleteAllProductSizeVations,
   getSingleProductSizeVations,
   editSingleSizeVariation,
};
