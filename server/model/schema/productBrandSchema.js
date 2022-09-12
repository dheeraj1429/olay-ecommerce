const mongoose = require("mongoose");

const productBrandSchema = new mongoose.Schema({
   name: { type: String, required: [true, "product brand is required"] },
   description: { type: String },
   website: { type: String },
   order: { type: Number, default: 0 },
   brandStatusInfo: { type: String, default: "draft" },
   brandIcon: { type: String },
   SEOTitle: { type: String },
   SEODescription: { type: String },
});

const productBrandModel = mongoose.model("productBrand", productBrandSchema);

module.exports = productBrandModel;
