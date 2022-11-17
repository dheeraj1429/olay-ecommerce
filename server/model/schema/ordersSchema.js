const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   userId: { type: mongoose.Types.ObjectId, ref: 'user' },
   orderItems: [
      {
         productId: { type: mongoose.Types.ObjectId, ref: 'product' },
         price: { type: Number },
         salePrice: { type: Number },
         qty: { type: Number },
         parentProductId: { type: mongoose.Types.ObjectId, ref: 'product' },
         subVariation: { type: Boolean, default: false },
      },
   ],
   paymentMethod: { type: String, required: [true, 'payment method is required'] },
   deliveryAddress: {
      fullName: { type: String },
      email: { type: String },
      phone: { type: String },
      country: { type: String, required: [true, 'Country name is required'] },
      state: { type: String, required: [true, 'state is required'] },
      city: { type: String, required: [true, 'city name is required'] },
      address: { type: String, required: [true, 'address is required'] },
   },
   currencyName: { type: String, required: [true, 'currency name is required'] },
   countryCode: { type: String, required: [true, 'currency code is required'] },
   currencySymbol: { type: String, required: [true, 'currency symbol is required'] },
   orderStatus: { type: String, default: 'Pending' },
   paymentStatus: { type: String, default: 'Pending' },
   orderCreateAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
