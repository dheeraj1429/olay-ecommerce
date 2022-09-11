const productModel = require("../model/schema/productSchema");
const categoryModel = require("../model/schema/productCategorySchema");

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
         return res.status(200).json({
            success: false,
            message: "something worng!!",
         });
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
         return res.status(200).json({
            success: false,
            message: "somthing worng!!",
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
};
