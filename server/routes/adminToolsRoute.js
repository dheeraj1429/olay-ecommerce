const express = require("express");
const route = express.Router();
const adminToolsControllers = require("../controllers/adminToolsControllers");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      if (file.mimetype == "text/csv") {
         if (file.fieldname === "importProductCsv") {
            callback(null, "./dataFiles/importData/Products");
         }
      }
   },
   filename: function (req, file, callback) {
      callback(null, file.originalname);
   },
});

const upload = multer({ storage: storage }).any();

// API => GET
route.get("/get-all-exports", adminToolsControllers.getAllExportInfo);
route.get("/download-prev-history", adminToolsControllers.downloadPrevHistoryFiles);
route.get("/download-csv-template", adminToolsControllers.downloadCsvTemplate);

// API => POST
route.post("/export/products", adminToolsControllers.getAllProductCsv);
route.post("/send-history-with-email", adminToolsControllers.sendHistoryFileWithEmail);
route.post("/import-csv-data", upload, adminToolsControllers.ImportCsvFileComponent);

// API => DELETE
route.delete("/delete-single-product-history/:id/:fileName", adminToolsControllers.deleteSingleProductHistory);

module.exports = route;
