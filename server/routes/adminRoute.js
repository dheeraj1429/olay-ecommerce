const express = require("express");
const route = express.Router();

const adminController = require("../controllers/adminControllers");

// Apis
route.post("/upload-category", adminController.uploadProductCategory);
route.get("/get-all-categorys", adminController.getAllCategorys);
route.patch("/edit-product-category", adminController.editproductCategory);
route.delete("/delete-selected-category/:id", adminController.deleteSelectedCategory);

module.exports = route;
