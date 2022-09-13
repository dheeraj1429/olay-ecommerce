const mongoose = require("mongoose");

const productBrandSchema = new mongoose.Schema({
   name: { type: String, required: [true, "product brand is required"] },
   description: { type: String },
   website: { type: String },
   order: { type: String, default: "0" },
   brandStatusInfo: { type: String, default: "draft" },
   brandIcon: { type: String },
   SEOTitle: { type: String, default: "No title" },
   SEODescription: { type: String, default: "No description" },
});

const productBrandModel = mongoose.model("productBrand", productBrandSchema);

module.exports = productBrandModel;
