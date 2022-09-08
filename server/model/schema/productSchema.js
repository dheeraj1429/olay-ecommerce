const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
   name: { type: String, required: [true, "product name is required"] },
   price: { type: Number, required: [true, "product price is required"] },
   discription: { type: String, required: [true, "product discription is required"] },
   image: { type: String, required: [true, "product image is required"] },
   category: { type: String, default: "Uncategory" },
   suggestedAge: { type: String, default: "Unsuggested" },
   suggestedSkinColor: { type: String, default: "Unsuggested" },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;
