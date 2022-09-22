const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
   name: { type: String, required: [true, "variation name is required!"] },
   slug: { type: String },
   description: { type: String },
   createdAt: { type: Date, default: Date.now },
});

const productSizeVariationModel = mongoose.model("sizeVariation", sizeSchema);

module.exports = productSizeVariationModel;
