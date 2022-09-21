const mongoose = require("mongoose");

const swatches = new mongoose.Schema({
   name: { type: String, required: [true, "variation name is required!"] },
   slug: { type: String },
   description: { type: String },
   colorCode: {
      hex: { type: String },
      hsv: { a: { type: Number }, h: { type: Number }, s: { type: Number }, v: { type: Number } },
      rgb: { a: { type: Number }, b: { type: Number }, g: { type: Number }, r: { type: Number } },
   },
});

const swatchesModel = mongoose.model("swatches", swatches);

module.exports = swatchesModel;
