const express = require("express");
const route = express.Router();
const adminToolsControllers = require("../controllers/adminToolsControllers");

// API => GET
route.get("/get-all-exports", adminToolsControllers.getAllExportInfo);
route.get("/download-prev-history", adminToolsControllers.downloadPrevHistoryFiles);

// API => POST
route.post("/export/products", adminToolsControllers.getAllProductCsv);
route.post("/send-history-with-email", adminToolsControllers.sendHistoryFileWithEmail);

// API => DELETE
route.delete(
   "/delete-single-product-history/:id/:fileName",
   adminToolsControllers.deleteSingleProductHistory
);

module.exports = route;
