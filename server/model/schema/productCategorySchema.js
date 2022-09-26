const mongoose = require("mongoose");
const categoryScheam = new mongoose.Schema({
   name: { type: String, required: [true, "please enter product category name"] },
   description: { type: String },
   products: [{ productId: { type: mongoose.Types.ObjectId, ref: "product" } }],
});

const categoryModel = mongoose.model("category", categoryScheam);

module.exports = categoryModel;
