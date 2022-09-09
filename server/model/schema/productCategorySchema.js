const mongoose = require("mongoose");
const categoryScheam = new mongoose.Schema({
   name: { type: String, required: [true, "please enter product category name"] },
   description: { type: String },
});

const categoryModel = mongoose.model("category", categoryScheam);

module.exports = categoryModel;
