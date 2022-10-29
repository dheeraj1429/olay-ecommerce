const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'user name is required'] },
   email: { type: String, required: [true, 'user email is required'] },
   token: { type: String, required: [true, 'user token is required'] },
   userId: { type: mongoose.Types.ObjectId, ref: 'user' },
   createdAt: { type: Date, default: Date.now },
});

subscriptionSchema.index({ email: 1 });

const subscriptionModel = mongoose.model('subscriptionUser', subscriptionSchema);

module.exports = subscriptionModel;
