const mongoose = require("mongoose");

const saleScheam = new mongoose.Schema({
   name: { type: String, required: [true, "plase enter the sale name"], index: true },
   statusInfo: { type: String, default: "Draft" },
   createdAt: { type: Date, default: Date.now },
   dateOfend: { type: Date },
   label: { type: mongoose.Types.ObjectId, ref: "productLabel" },
   products: [
      {
         productId: { type: mongoose.Types.ObjectId, ref: "product" },
         quntity: { type: Number },
         salePrice: { type: Number },
      },
   ],
});

saleScheam.index({ name: 1 });

const saleModel = mongoose.model("FlashSale", saleScheam);

module.exports = saleModel;
