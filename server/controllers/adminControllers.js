// https://groceryuae.com/admin

const productModel = require("../model/schema/productSchema");
const categoryModel = require("../model/schema/productCategorySchema");
const productBrandModel = require("../model/schema/productBrandSchema");
const productsTagsModel = require("../model/schema/productsTagsSchema");
const { erroResponse } = require("./errorResponse");
const { imageCompress, catchAsync, fetchLimitDocument, convertObjectDataIntoArray } = require("../helpers/helpers");
const httpStatusCodes = require("../helpers/httpStatusCodes");
const swatchesModel = require("../model/schema/productVariationSwatchesSchema");
const productSizeVariationModel = require("../model/schema/productSizeVariationSchema");
const AppError = require("../helpers/appError");
const saleModel = require("../model/schema/FlashSaleSchema");
const productLabelModel = require("../model/schema/productLabelSchema");

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

const uploadProductCategory = catchAsync(async function (req, res, next) {
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
});

const getAllCategorys = catchAsync(async function (req, res, next) {
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
});

/**
 * @editproductCategory find the category and update then catefory fileds
 * @return flag true and false
 */
const editproductCategory = catchAsync(async function (req, res, next) {
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
});

/**
 * @deleteSelectedCategory find the category and remove.
 * @return category delete succesful or not
 */
const deleteSelectedCategory = catchAsync(async function (req, res, next) {
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
});

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
const insertNewProductBrand = catchAsync(async function (req, res, next) {
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

         await imageCompress(imagePath, 130, "brandImagesCompress", originalname);

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
});

/**
 * @getAllProductBrand get all brand
 * @return send brand array of object to the client
 */
const getAllProductBrand = catchAsync(async function (req, res, next, perItems = undefined) {
   /**
    * @BRAND_LIMIT how many documents we want to return to the client
    * @page which page is client right now ?page=1 ......
    * @totalProductBrandSize how many document we have in a database.
    */
   const BRAND_LIMIT = perItems ? perItems : 2;

   const page = req.query.page || 0;

   await fetchLimitDocument(productBrandModel, page, res, httpStatusCodes, BRAND_LIMIT, "brands");
});

const deleteOneProductBrand = catchAsync(async function (req, res, next) {
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
});

/**
 * @deleteSelectedProductBrand delete selected products brands
 */
const deleteSelectedProductBrand = catchAsync(async function (req, res, next) {
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
});

const getSelectedBrandProduct = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   console.log(id);

   if (!id) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "selected brand id is required",
      });
   }

   const findSelectedBrandProduct = await productBrandModel.findOne({
      _id: id,
   });

   if (findSelectedBrandProduct) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         selectedBrand: findSelectedBrandProduct,
      });
   } else {
      erroResponse(res);
   }
});

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
const editSelectedBrand = catchAsync(async function (req, res, next) {
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

      await imageCompress(imagePath, 130, "brandImagesCompress", originalname);

      updateSelectedProductBrand = updateFildes(id, updateObject, res);
   } else {
      updateSelectedProductBrand = updateFildes(id, updateObject, res);
   }
});

const deleteAllProductBrand = catchAsync(async function (req, res, next) {
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
});

const getProductBrands = catchAsync(async function (req, res, next) {
   const fetchProductBrandItems = await productBrandModel.find({}, { name: 1 });

   if (fetchProductBrandItems) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         brands: fetchProductBrandItems,
      });
   } else {
      erroResponse(res);
   }
});

/**
 * @saveProductInDb send back the reponse the the client
 */

/**
 * @updateSelectedCollections insert product id into the product brand collections and the product category collection.
 */
const updateSelectedCollections = catchAsync(async function (id, uploadProductId, collection) {
   await collection.updateOne(
      { _id: id },
      {
         $push: {
            products: { productId: uploadProductId },
         },
      }
   );
});

const saveProductInDb = async function (object, res) {
   let insertProduct, saveProduct;
   insertProduct = await productModel(object);
   saveProduct = await insertProduct.save();
   let uploadProductId = saveProduct._id;

   /**
    * insert the product id into the selected barnds and the selected category collections.
    * if the product  barnd collections does not contains the product upload id, so we want to push
    * the id into the brand collections or the selected category collections.
    * if user just search by the category the we can send back the all products filtes by products id.
    * which is inside the category or the brands collections.
    * first we want the check the id is exists not inside the selected brand and the category collections.
    * if the is is exists then no neet to store the id into the collections.
    */

   if (object?.brand) {
      await updateSelectedCollections(object.brand, uploadProductId, productBrandModel);
   }

   if (object?.category) {
      await updateSelectedCollections(object.category, uploadProductId, categoryModel);
   }

   if (saveProduct) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "Product saved",
      });
   } else {
      erroResponse(res);
   }
};

const uploadNewProduct = catchAsync(async function (req, res, next) {
   const { name } = req.body;

   /**
    * when user upload new product with selected category and selected barnd then product id store into the product category collection and alost the product brand collection.
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

         await imageCompress(imagePath, 250, "productImagesCompress", originalname);

         productObject.productImage = originalname;
         await saveProductInDb(productObject, res);
      } else {
         await saveProductInDb(productObject, res);
      }
   }
});

/**
 * @fetchUploadProducts return products documents
 */
const fetchUploadProducts = catchAsync(async function (req, res, next) {
   const page = req.query.page;
   // const subVatiaions = req.query.subVatiaions;

   if (!page) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "page id is required!",
      });
   }

   /**
    * @DOCUMENT_LIMIT how to document we want the send back to the client
    */
   const DOCUMENT_LIMIT = 10;

   await fetchLimitDocument(productModel, page, res, httpStatusCodes, DOCUMENT_LIMIT, "products");
});

const deleteAllProducts = catchAsync(async function (req, res, next) {
   const deleteProducts = await productModel.deleteMany({});

   if (!!deleteProducts.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "All products delete",
      });
   } else {
      erroResponse(res);
   }
});

/**
 * @deleteSelectedProducts delete selected produsts from the database
 */
const deleteSelectedProducts = catchAsync(async function (req, res, next) {
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
});

const removeIdsFromDocuments = async function (collection, collecitonId, productId) {
   /**
    * once admin just delete the products we also make sure to delete the products from category
    * or the product brands collections.
    */
   await collection.updateOne({ _id: collecitonId }, { $pull: { products: { productId: productId } } });
};

/**
 * @deleteOneProduct delete one selected products from the database
 * @return if the products is successfully deleted ten send back the true response || send false response.
 */
const deleteOneProduct = catchAsync(async function (req, res, next) {
   const { id, categoryId, brandId } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "product id is required!",
      });
   }

   if (id && categoryId !== "undefined") {
      await removeIdsFromDocuments(categoryModel, categoryId, id);
   }

   if (id && brandId !== "undefined") {
      await removeIdsFromDocuments(productBrandModel, brandId, id);
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
});

const fetchSingleProduct = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "product id is required!",
      });
   }

   const findSingleProduct = await productModel
      .findOne({ _id: id })
      .populate("category", { name: 1 })
      .populate("brand", { name: 1 })
      .populate("tags._id", { name: 1 });

   if (findSingleProduct) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         product: findSingleProduct,
      });
   } else {
      erroResponse(res);
   }
});

const changeCollectionDataPosition = async function (field, productId, collection, prevId) {
   try {
      const checkIsProductAlreadyExists = await collection.findOne({
         _id: field,
         "products.productId": productId,
      });

      if (!checkIsProductAlreadyExists) {
         const findBrandProductAndInsertId = await collection.updateOne(
            { _id: field },
            { $push: { products: { productId: productId } } }
         );

         if (!!findBrandProductAndInsertId.modifiedCount) {
            await collection.updateOne({ _id: prevId }, { $pull: { products: { productId: productId } } });
         }
      }
   } catch (err) {
      console.log(err);
   }
};

const editSingleProduct = catchAsync(async function (req, res, next) {
   const id = req.params.id;
   const file = req.files[0];

   /**
    * if the user remove remove the selected barnd or selected category then remove the product id
    * from the brand and also from the category.
    */
   const { selectedProductId } = req.query;

   if (!id) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: "Product id is required!",
      });
   }

   const updateObjectInfo = { ...req.body };
   // updateObjectInfo.tag = JSON.parse(editSingleProduct.tags);

   /**
    * if the admin want to update the brand and the category fileds.
    * first we want to grab the client data to find the which id we want to store into the database.
    * if the admin upload the product without the selecting the brand the the category fileds.
    * that time we want to store '' string.
    *
    * if the admin update the product and change the category and the brand fileds. we want to first grab
    * the prev id and keep tracking to which id or which collections data has alrady.
    * We want to grab the id and the prve collections id. first we need to store the id into the new
    * collection and push the id into the new collections document and store.
    *
    * and then remove the id -> product id from the prev colletions. because we don't want to store product
    * into the multipal collecitons.
    *
    * if the prev id is '' string then we want to sstore the id into the selected brand or category
    * documents.
    *
    * store all the data ( update ) into the selected product collection.
    * and sends back the response to the client.
    */

   const findProduct = await productModel.findOne({ _id: selectedProductId });
   const productId = findProduct._id;
   const prevBrandId = findProduct?.brand;
   const prevCategoryId = findProduct?.category;

   if (req.body?.brand && prevBrandId && prevBrandId !== req.body.brand) {
      await changeCollectionDataPosition(req.body.brand, productId, productBrandModel, prevBrandId);
   } else if (req.body?.brand && !prevBrandId) {
      await productBrandModel.updateOne({ _id: req.body.brand }, { $push: { products: { productId: productId } } });
   }

   if (req.body?.category && prevCategoryId && prevCategoryId !== req.body.category) {
      await changeCollectionDataPosition(req.body.category, productId, categoryModel, prevCategoryId);
   } else if (req.body?.category && !prevCategoryId) {
      await categoryModel.updateOne({ _id: req.body.category }, { $push: { products: { productId: productId } } });
   }

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
});

/**
 * @insertNewProductTag insert new tags into the database if the tag is not exists. the product tag is already exists then return the response to the client.
 */
const insertNewProductTag = catchAsync(async function (req, res, next) {
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
});

const getAllProductTags = catchAsync(async function (req, res, next) {
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
});

const deleteAllProductTags = catchAsync(async function (req, res, next) {
   const deleteAllTags = await productsTagsModel.deleteMany({});
   if (!!deleteAllTags.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "All products tags deleted",
      });
   } else {
      throw new Error("Somthing worng!");
   }
});

const deleteSelectedTag = catchAsync(async function (req, res, next) {
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
});

const getSelectedProductTag = catchAsync(async function (req, res, next) {
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
});

const udpateProductTag = catchAsync(async function (req, res, next) {
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
});

const getAllProductTagsDocuments = catchAsync(async function (req, res, next) {
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
});

const insertNewProductSwatches = catchAsync(async function (req, res, next) {
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
});

const getAllProductSwatches = catchAsync(async function (req, res, next) {
   const getAllSwatches = await swatchesModel.find({});

   if (getAllSwatches) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         allSwatches: getAllSwatches,
      });
   } else {
      throw new Error("Someting worng");
   }
});

const removeAllProductsSwatches = catchAsync(async function (req, res, next) {
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
});

const fetchSingleSwatchs = catchAsync(async function (req, res, next) {
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
});

const editSingleProductSwatches = catchAsync(async function (req, res, next) {
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
});

const removeSelectedProductSwatches = catchAsync(async function (req, res, next) {
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
});

const insertNewProductSizeVairation = catchAsync(async function (req, res, next) {
   const { name, slug, description } = req.body;

   if (!name) {
      throw new Error("name is reuqired!");
   }

   const checkSizeVariationIsExists = await productSizeVariationModel.findOne({
      name,
   });

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
});

const getAllProductSizeVariations = catchAsync(async function (req, res, next) {
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
});

const removeSingleProductSizeVariation = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      throw new Error("id is required");
   }

   const deleteSelectedSize = await productSizeVariationModel.deleteOne({
      _id: id,
   });

   if (!!deleteSelectedSize.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product size variation removed form the database",
      });
   } else {
      throw new Error("Somting worng with the size variations!!");
   }
});

const deleteAllProductSizeVations = catchAsync(async function (req, res, next) {
   const deleteSizes = await productSizeVariationModel.deleteMany({});

   if (!!deleteSizes.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product size variation removed form the database",
      });
   } else {
      throw new Error("Somting worng with the size variations!!");
   }
});

const getSingleProductSizeVations = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      throw new Error("id is required");
   }

   const findSizeVariation = await productSizeVariationModel.findOne({
      _id: id,
   });

   if (findSizeVariation) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         variation: findSizeVariation,
      });
   } else {
      throw new Error("Somting worng with the size variations!!");
   }
});

const editSingleSizeVariation = catchAsync(async function (req, res, next) {
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

   // const isVariationsExists = await productSizeVariationModel.findOne({ name: req.body.name });

   // if (isVariationsExists) {
   //    return res.status(httpStatusCodes.OK).json({
   //       success: true,
   //       message: "Size variation is alrady exists",
   //    });
   // } else {
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
   // }
});

const sendClientResponse = function (res, updateDocument) {
   if (!!updateDocument.modifiedCount) {
      res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "Product sub variation created",
      });
   } else {
      res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
};

const insertSelectedProductVariation = catchAsync(async function (req, res, next) {
   const { selectedProductId } = req.body;
   let insertNewSubProductVariation;

   if (!selectedProductId) {
      throw new Error(`product perent id is required`);
   }

   /**
    * @findParentProduct find the parent product. because we want to update onlye the selected product.
    */
   const findParentProduct = await productModel.findOne({
      _id: selectedProductId,
   });

   if (findParentProduct) {
      /**
       * fiest we need to find the varitions is exists or not. if the product varitions is exits then send back the response to client. otherwise insert the new product sub vaitions.
       */

      const findProductSubVaitionIsExist = await productModel.findOne({
         _id: selectedProductId,
         "variations.variationName": req.body.name,
      });

      if (!!findProductSubVaitionIsExist?.variations.length) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Product sub vaition is alrady exists",
         });
      } else {
         const updatedFildes = {
            variationName: req.body.variationName,
            sku: req.body.sku,
            regularPrice: !!req.body.regularPrice ? req.body.regularPrice : findParentProduct.price,
            salePrice: req.body.salePrice,
            stokeStatus: !!req.body.stokeStatus ? req.body.stokeStatus : "draft",
            description: req.body.description,
            colorSwatches: req.body.colorSwatches,
            size: req.body.size,
            weight: !!req.body.weight ? !!req.body.weight : findParentProduct.weight || "",
            length: !!req.body.length ? !!req.body.length : findParentProduct.length || "",
            wide: !!req.body.wide ? !!req.body.wide : findParentProduct.wide || "",
            height: !!req.body.height ? !!req.body.height : findParentProduct.height || "",
         };

         if (req.files[0]) {
            const file = req.files[0];
            const originalname = file.originalname;
            const imagePath = file.path;
            updatedFildes.variationImage = originalname;

            /**
             * compress the uploaded file into the another folder. when the user requret for the small size image then send back the compress version of image ( for the load time ).
             */
            await imageCompress(imagePath, 150, "productImagesCompress", originalname);

            insertNewSubProductVariation = await productModel.updateOne(
               { _id: selectedProductId },
               { $push: { variations: updatedFildes } }
            );

            sendClientResponse(res, insertNewSubProductVariation);
         } else {
            /**
             * if the product image is not posted then use the parnet image path to fecth the parent image with sub vaitions.
             */
            updatedFildes.variationImage = productModel.productImage;

            insertNewSubProductVariation = await productModel.updateOne(
               { _id: selectedProductId },
               { $push: { variations: updatedFildes } }
            );

            sendClientResponse(res, insertNewSubProductVariation);
         }
      }
   } else {
      next(new AppError("Parent product id is required!", 404));
   }
});

const getSingelSubProductVariation = catchAsync(async function (req, res, next) {
   const { subVariation, parentProductId } = req.query;

   /**
    * @findSubVaition find the sub variation is exits or not if the sub viation is exits then return data to the client.
    * find the sub document using the id.
    */

   if (!parentProductId || !subVariation) {
      next(new AppError("sub variation id is required"));
   }

   const findSubVaition = await productModel
      .findOne({ _id: parentProductId, "variations._id": { $eq: subVariation } }, { "variations.$": 1 })
      .populate("variations.size")
      .populate("variations.colorSwatches");

   if (findSubVaition) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         subVariation: findSubVaition,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "internal server error",
      });
   }
});

/**
 *
 * @param { Id } parentProductId
 * @param { Id } subVaritionId
 * @param { Object } updateObject
 * @param { Object } res
 */
const updateSubVaritionFunction = async function (parentProductId, subVaritionId, updateObject, res) {
   let findSubVariationAndUpdate;

   /**
    * @findSubVariationAndUpdate update the selected varition
    * @return send back the reponse
    */
   findSubVariationAndUpdate = await productModel.updateOne(
      { _id: parentProductId, "variations._id": subVaritionId },
      {
         $set: updateObject,
      }
   );

   if (!!findSubVariationAndUpdate.modifiedCount && findSubVariationAndUpdate.acknowledged) {
      res.status(httpStatusCodes.OK).json({
         success: true,
         message: "product updated",
      });
   } else if (findSubVariationAndUpdate.acknowledged) {
      res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product sub varition alrady updated",
      });
   } else {
      res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
};

const updateSingleSubVariation = catchAsync(async function (req, res, next) {
   /**
    * grab all the data from the client side. if the user send the image and want to upload the image then update image path form the database. if admin only update the others fildes then only store the others files.
    * check first if the sub variation is exits or not if not then throw new error.
    * check the subvaritions by id.
    * if the admin update already then send another response to the client.
    */
   const file = req.files;

   // sub varition id for finding the target sub varition
   const { subVaritionId, parentProductId } = req.body;

   const updateObject = {
      "variations.$.variationName": req.body.name,
      "variations.$.sku": req.body.sku,
      "variations.$.regularPrice": req.body.regularPrice,
      "variations.$.salePrice": req.body.salePrice,
      "variations.$.stokeStatus": req.body.stokeStatus,
      "variations.$.description": req.body.description,
      "variations.$.variationImage": req.body.variationImage,
      "variations.$.colorSwatches": req.body.colorSwatches,
      "variations.$.colorSwatches": req.body.colorSwatches,
      "variations.$.size": req.body.size,
      "variations.$.weight": req.body.weight,
      "variations.$.length": req.body.length,
      "variations.$.wide": req.body.wide,
      "variations.$.height": req.body.height,
   };

   if (!subVaritionId) {
      next(new AppError("sub variation id is required!"));
   }

   if (!!file.length) {
      const imagePath = file[0].path;
      const originalname = file[0].originalname;

      await imageCompress(imagePath, 400, "productImagesCompress", originalname);

      updateObject["variations.$.variationImage"] = originalname;
      await updateSubVaritionFunction(parentProductId, subVaritionId, updateObject, res);
   } else {
      await updateSubVaritionFunction(parentProductId, subVaritionId, updateObject, res);
   }
});

const deleteSingleSubVariation = catchAsync(async function (req, res, next) {
   const { parentId, subVariationId } = req.query;

   if (!parentId) {
      next(new AppError("parent id is required for delete sub variation"));
   }

   if (!subVariationId) {
      next(new AppError("sub variation id is required"));
   }

   const findSubVaitionAndDelete = await productModel.updateOne(
      { _id: parentId },
      {
         $pull: {
            variations: { _id: subVariationId },
         },
      }
   );

   if (!!findSubVaitionAndDelete.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: "true",
         message: "product sub variation deleted",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).jons({
         message: "Internal server error",
      });
   }
});

// store the flash sale data into the database and the send back to reponse.
const storeSaleInfo = async function (data, response) {
   try {
      let insertNewSale = await saleModel(data);
      let saleSave = await insertNewSale.save();

      if (saleSave) {
         return response.status(httpStatusCodes.CREATED).json({
            success: true,
            message: "new sale saved",
         });
      } else {
         return response.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "Internal server error",
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const insertNewProductFlashSale = catchAsync(async function (req, res, next) {
   const { name, statusInfo, label } = req.body;

   const findIsSaleExists = await saleModel.findOne({ name });

   const data = {
      name,
      statusInfo,
   };

   if (findIsSaleExists) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Sale is alrady exists",
      });
   } else {
      if (req.body?.selectedProduct) {
         /**
          * store the name or the status info the database.
          * for the sub selected product. first loop over the the object to get the access the object
          * key and values and then selcted the each sub object key and values then then push inside
          * the sale model.
          */

         data.products = convertObjectDataIntoArray(req.body.selectedProduct);

         await storeSaleInfo(data, res);
      } else if (name && !label) {
         await storeSaleInfo(data, res);
      } else if (name && label) {
         data.label = label;
         await storeSaleInfo(data, res);
      }
   }
});

const getAllFlashSales = catchAsync(async function (req, res, next) {
   const page = req.query.page;

   if (!page) next(new AppError("flash sale page number is required!"));

   const DOCUMENT_LIMIT = 10;

   await fetchLimitDocument(saleModel, page, res, httpStatusCodes, DOCUMENT_LIMIT, "sales", {
      products: 0,
   });
});

const deleteAllFlashSales = catchAsync(async function (req, res, next) {
   const deleteAllSales = await saleModel.deleteMany({});

   if (!!deleteAllSales.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "All Flash sales deleted",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const deleteSingleFlashSale = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      next(new AppError("flash sale id is required!"));
   }

   const findFlashSaleAndDelete = await saleModel.deleteOne({ _id: id });

   if (!!findFlashSaleAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Flash sales deleted",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const getSinlgeFlashSale = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      next(new AppError("Flash sale id is required!"));
   }

   const findSinlgeFlashSale = await saleModel
      .findOne({ _id: id })
      .populate("products.productId", { name: 1, productImage: 1 });

   if (findSinlgeFlashSale) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         sale: findSinlgeFlashSale,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const updateFlashSaleInfo = async function (colleciton, flashSaleId, data, res) {
   try {
      const findAndUpdateFlashSaleDetails = await colleciton.updateOne({ _id: flashSaleId }, { $set: data });

      if (findAndUpdateFlashSaleDetails.acknowledged && !!findAndUpdateFlashSaleDetails.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Flash sale updated",
         });
      } else if (findAndUpdateFlashSaleDetails.acknowledged && !findAndUpdateFlashSaleDetails.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: "Flash sale alrady updated",
         });
      } else {
         next(new AppError("Can't update the flash sale document"));
      }
   } catch (err) {
      console.log(err);
   }
};

const updateSingleFlashSale = catchAsync(async function (req, res, next) {
   const { flashSaleId } = req.body;

   if (!flashSaleId) {
      next(new AppError("Flash sale id is required for update the sub variaitons products data"));
   }

   const { statusInfo, name, dateOfend, label } = req.body;

   const data = {
      name,
      statusInfo,
      dateOfend: !!dateOfend ? dateOfend : "",
   };

   if (req.body?.selectedProduct && label) {
      data.label = label;
      data.products = convertObjectDataIntoArray(req.body.selectedProduct);
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (!label && req.body?.selectedProduct) {
      data.products = convertObjectDataIntoArray(req.body.selectedProduct);
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (!label && name) {
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (label && name) {
      data.label = label;
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   }
});

const deleteFlashSaleProduct = catchAsync(async function (req, res, next) {
   const { productId, parentSaleId } = req.query;

   if (!productId) next(new AppError("Flash sale product id is required!"));
   if (!parentSaleId) next(new AppError("Flash sale id is required!"));

   const findFlashProductAndRemove = await saleModel.updateOne(
      { _id: parentSaleId },
      {
         $pull: {
            products: { productId: productId },
         },
      }
   );

   if (!!findFlashProductAndRemove.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Flash sale product removed",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const insertNewProductColorLable = catchAsync(async function (req, res, next) {
   const { name, slug, description, color } = req.body;

   const findLabelIsExists = await productLabelModel.findOne({ name });

   if (findLabelIsExists) {
      res.status(httpStatusCodes.OK).json({
         success: true,
         message: "product label is already exists",
      });
   }

   const insertNewProductLabel = await productLabelModel({
      name,
      slug,
      description,
      colorCode: color,
   });

   const saveLabel = await insertNewProductLabel.save();

   if (saveLabel) {
      res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: "Product label saved",
      });
   } else {
      res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const getAllProductLable = catchAsync(async function (req, res, next) {
   const getAllLabels = await productLabelModel.find({});

   if (getAllLabels) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         allLabels: getAllLabels,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const deleteAllProductLabel = catchAsync(async function (req, res, next) {
   const deleteAllLabels = await productLabelModel.deleteMany({});

   if (deleteAllLabels) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "All product labels deleted",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const deleteSingleProductLabel = catchAsync(async function (req, res, next) {
   const { id } = req.params;

   if (!id) {
      next(new AppError("Product label id is required!"));
   }

   const findProductLabeleAndDelete = await productLabelModel.deleteOne({ _id: id });

   if (!!findProductLabeleAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "selected product label deleted",
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const getSingleProductLabel = catchAsync(async function (req, res, next) {
   const { id } = req.params;

   if (!id) {
      next(new AppError("Product label id is required"));
   }

   const findSelectedProductlabel = await productLabelModel.findOne({ _id: id });

   if (findSelectedProductlabel) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         label: findSelectedProductlabel,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: "Internal server error",
      });
   }
});

const updateProductLabel = catchAsync(async function (req, res, next) {
   const { name, slug, id, description, color } = req.body;

   if (!id) {
      next(new AppError("Update product label id is required!"));
   }

   const findProductLabelAndUpdate = await productLabelModel.updateOne(
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

   if (!!findProductLabelAndUpdate.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product label updated",
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: "Product label already updated",
      });
   }
});

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
   getSingelSubProductVariation,
   updateSingleSubVariation,
   deleteSingleSubVariation,
   insertNewProductFlashSale,
   getAllFlashSales,
   deleteAllFlashSales,
   deleteSingleFlashSale,
   getSinlgeFlashSale,
   updateSingleFlashSale,
   deleteFlashSaleProduct,
   insertNewProductColorLable,
   getAllProductLable,
   deleteAllProductLabel,
   deleteSingleProductLabel,
   getSingleProductLabel,
   updateProductLabel,
};
