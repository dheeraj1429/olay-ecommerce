const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   userId: { type: mongoose.Types.ObjectId, ref: 'user' },
   productId: { type: mongoose.Types.ObjectId, ref: 'product' },
   qty: { type: Number, default: 1 },
   paymentMethod: { type: String, required: [true, 'payment method is required'] },
   process: { type: String, default: 'Pending' },
   addressId: { type: mongoose.Types.ObjectId, ref: 'user' },
   createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
