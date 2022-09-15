const express = require("express");
const route = express.Router();
const multer = require("multer");

const adminController = require("../controllers/adminControllers");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      if (
         file.mimetype === "image/png" ||
         file.mimetype === "image/jpeg" ||
         file.mimetype === "image/jpg"
      ) {
         if (file.fieldname === "productImage") {
            cb(null, "./upload/productImages");
         } else {
            cb(null, "./upload/brandImages");
         }
      }
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname);
   },
});

const upload = multer({ storage: storage }).any();

// Apis
route.post("/upload-category", adminController.uploadProductCategory);
route.get("/get-all-categorys", adminController.getAllCategorys);
route.patch("/edit-product-category", adminController.editproductCategory);
route.delete("/delete-selected-category/:id", adminController.deleteSelectedCategory);
route.post("/insert-new-product-brand", upload, adminController.insertNewProductBrand);
route.get("/get-all-product-brand", adminController.getAllProductBrand);
route.delete("/delete-one-product-brand/:id", adminController.deleteOneProductBrand);
route.post("/delete-multi-product-brand", adminController.deleteSelectedProductBrand);
route.post("/get-selected-product-brand/:id", adminController.getSelectedBrandProduct);
route.patch("/update-selected-product-brand", upload, adminController.editSelectedBrand);
route.delete("/delete-all-products-brand", adminController.deleteAllProductBrand);
// route.post("/fetch-product-brands-items/:id", adminController.fetchProductBrandItems);
route.get("/get-all-brands", adminController.getProductBrands);
route.post("/insert-new-product", upload, adminController.uploadNewProduct);
route.get("/get-upload-products", adminController.fetchUploadProducts);
route.delete("/delete-all-products", adminController.deleteAllProducts);

module.exports = route;
