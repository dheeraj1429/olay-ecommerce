const mongoose = require('mongoose');

const shopLocationSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'shop name is required'] },
   phone: { type: Number, required: [true, 'number is required'] },
   email: { type: String, required: [true, 'shop owner email is required'] },
   address: { type: String, required: [true, 'shop address is required'] },
   state: { type: String, required: [true, 'State is required'] },
   city: { type: String, required: [true, 'city is required'] },
   country: { type: String, required: [true, 'country is required'] },
});

shopLocationSchema.index({ name: 1 });

const shopLoactionModel = mongoose.model('shopLoaction', shopLocationSchema);

module.exports = shopLoactionModel;
