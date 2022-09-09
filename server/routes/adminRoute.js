const express = require("express");
const route = express.Router();

const adminController = require("../controllers/adminControllers");

// Apis
route.post("/admin-sign-in", adminController.adminSignIn);
route.post("/upload-category", adminController.uploadProductCategory);
route.get("/get-all-categorys", adminController.getAllCategorys);
route.patch("/edit-product-category", adminController.editproductCategory);

module.exports = route;
