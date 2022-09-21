const express = require("express");
const route = express.Router();
const multer = require("multer");

const adminController = require("../controllers/adminControllers");

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
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
route.get("/get-all-brands", adminController.getProductBrands);
route.post("/insert-new-product", upload, adminController.uploadNewProduct);
route.get("/get-upload-products", adminController.fetchUploadProducts);
route.delete("/delete-all-products", adminController.deleteAllProducts);
route.post("/delete-selected-products", adminController.deleteSelectedProducts);
route.delete("/delete-one-product/:id", adminController.deleteOneProduct);
route.get("/get-single-product/:id", adminController.fetchSingleProduct);
route.patch("/eidt-single-product/:id", upload, adminController.editSingleProduct);
route.post("/save-new-product-tag", adminController.insertNewProductTag);
route.get("/get-all-product-tags", adminController.getAllProductTags);
route.delete("/delete-all-products-tags", adminController.deleteAllProductTags);
route.delete("/delete-single-product-tags/:id", adminController.deleteSelectedTag);
route.get("/get-selected-product-tag/:id", adminController.getSelectedProductTag);
route.patch("/update-product-tag", adminController.udpateProductTag);
route.get("/get-all-product-tags-documents", adminController.getAllProductTagsDocuments);
route.post("/insert-new-product-swatches", adminController.insertNewProductSwatches);
route.get("/get-products-all-swatchs", adminController.getAllProductSwatches);
route.delete("/remove-all-color-swatches", adminController.removeAllProductsSwatches);
route.get("/get-single-product-swatches/:id", adminController.fetchSingleSwatchs);
route.patch("/edit-single-product-swatches", adminController.editSingleProductSwatches);

module.exports = route;
