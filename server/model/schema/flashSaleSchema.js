const mongoose = require('mongoose');

const saleScheam = new mongoose.Schema({
   name: { type: String, required: [true, 'plase enter the sale name'], index: true },
   statusInfo: { type: String, default: 'Draft' },
   createdAt: { type: Date, default: Date.now },
   dateOfend: { type: Date },
   label: { type: mongoose.Types.ObjectId, ref: 'productLabel' },
   dateOfStart: { type: Date, required: [true, 'Start date is required'] },
   dateOfStartTime: { type: Date, required: [true, 'Start time is required'] },
   dateOfend: { type: Date, required: [true, 'End date is required'] },
   dateOfEndTime: { type: Date, required: [true, 'End data time is required'] },
   startTimeWithDate: { type: Date },
   endTimeWithDate: { type: Date },
   sale: { type: String, default: 'Close' },
   products: [
      {
         productId: { type: mongoose.Types.ObjectId, ref: 'product' },
         quntity: { type: Number },
         salePrice: { type: Number },
      },
   ],
});

saleScheam.index({ name: 1 });

const saleModel = mongoose.model('FlashSale', saleScheam);

module.exports = saleModel;
