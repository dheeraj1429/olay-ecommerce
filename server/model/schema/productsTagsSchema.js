const mongoose = require("mongoose");

const productsTags = new mongoose.Schema({
   name: { type: String, required: [true, "tag name is required"] },
   description: { type: String },
   status: { type: String, default: "Draft" },
});

const productsTagsModel = mongoose.model("tag", productsTags);

module.exports = productsTagsModel;
