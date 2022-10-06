const express = require("express");
const route = express.Router();
const adminToolsControllers = require("../controllers/adminToolsControllers");

// API => GET
route.get("/get-all-exports", adminToolsControllers.getAllExportInfo);

// API => POST
route.post("/export/products", adminToolsControllers.getAllProductCsv);

module.exports = route;
