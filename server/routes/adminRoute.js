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
         cb(null, "./upload/brandImages");
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

module.exports = route;
