const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: { type: String, required: [true, "product name is required"] },
   price: { type: Number, required: [true, "product price is required"] },
   salePrice: { type: Number },
   discription: { type: String },
   category: { type: mongoose.Types.ObjectId, ref: "category" },
   stockStatus: { type: String },
   weight: { type: Number },
   length: { type: Number },
   wide: { type: Number },
   height: { type: Number },
   productImage: { type: String },
   suggestedAge: { type: String, default: "Unsuggested" },
   brand: { type: mongoose.Types.ObjectId, ref: "productBrand" },
   createdAt: { type: Date, default: Date.now },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
