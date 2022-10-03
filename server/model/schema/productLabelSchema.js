const mongoose = require("mongoose");

const label = new mongoose.Schema({
   name: { type: String, required: [true, "Product label name is required!"] },
   slug: { type: String },
   description: { type: String },
   colorCode: {
      hex: { type: String },
      hsv: { a: { type: Number }, h: { type: Number }, s: { type: Number }, v: { type: Number } },
      rgb: { a: { type: Number }, b: { type: Number }, g: { type: Number }, r: { type: Number } },
   },
   createdAt: { type: Date, default: Date.now },
});

label.index({ name: 1 });

const productLabelModel = mongoose.model("productLabel", label);

module.exports = productLabelModel;
