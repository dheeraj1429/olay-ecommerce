const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'product name is required'] },
   price: { type: Number, required: [true, 'product price is required'] },
   salePrice: { type: Number },
   discription: { type: String },
   category: { type: mongoose.Types.ObjectId, ref: 'category' },
   stockStatus: { type: String },
   weight: { type: Number },
   length: { type: Number },
   wide: { type: Number },
   height: { type: Number },
   productImage: { type: String },
   suggestedAge: { type: String, default: 'Unsuggested' },
   brand: { type: mongoose.Types.ObjectId, ref: 'productBrand' },
   createdAt: { type: Date, default: Date.now },
   productStatusInfo: { type: String, default: 'draft' },
   tags: [{ _id: { type: mongoose.Types.ObjectId, ref: 'tag' } }],
   productType: { type: String, default: 'Untype' },
   metaContent: { type: String },
   variations: [
      {
         variationName: {
            type: String,
            required: [true, 'product sub variation name is reuqired'],
         },
         sku: { type: String },
         regularPrice: { type: Number },
         salePrice: { type: Number },
         stokeStatus: { type: String, default: 'draft' },
         description: { type: String },
         variationImage: { type: String },
         colorSwatches: { type: mongoose.Types.ObjectId, ref: 'swatches' },
         // size: { type: mongoose.Types.ObjectId, ref: 'sizeVariation' },
         weight: { type: Number },
         length: { type: Number },
         wide: { type: Number },
         height: { type: Number },
         createdAt: { type: Date, default: Date.now },
      },
   ],
});

productSchema.index({ name: 1 });

const productModel = mongoose.model('product', productSchema);

module.exports = productModel;
