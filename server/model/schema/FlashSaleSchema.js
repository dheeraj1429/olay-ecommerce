const mongoose = require("mongoose");

const saleScheam = new mongoose.Schema({
   name: { type: String, required: [true, "plase enter the sale name"], index: true },
   statusInfo: { type: String, default: "Draft" },
   products: [
      {
         productId: { type: mongoose.Types.ObjectId, ref: "product" },
         quntity: { type: Number },
         salePrice: { type: Number },
      },
   ],
});

const saleModel = mongoose.model("FlashSale", saleScheam);

module.exports = saleModel;
