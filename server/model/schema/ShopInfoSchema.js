const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'shop name is required'] },
   countryCode: { type: String, required: [true, 'Country code is required'] },
   phone: { type: Number, required: [true, 'shop phone number is required'] },
   address: { type: String, required: [true, 'shop address is required'] },
   state: { type: String, required: [true, 'shop state is required'] },
   city: { type: String, required: [true, 'shop city is required'] },
   VATNumber: { type: String, required: [true, 'vat number is required'] },
   startWith: { type: String },
   endWith: { type: String },
   unitOfWeigth: { type: String },
   unitOfHeigth: { type: String },
   thousandsSeparator: { type: String },
   decimalSeparator: { type: String },
   currencyName: { type: String },
   currencyNumberdecimals: { type: Number },
   currencySymbol: { type: String },
   currencyPosition: { type: String },
});

shopSchema.index({ name: 1 });

const shopModel = mongoose.model('shopInfo', shopSchema);

module.exports = shopModel;
