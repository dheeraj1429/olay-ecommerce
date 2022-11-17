const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const JWT_TOKEN = process.env.JWT_TOKEN;

const userSchema = new mongoose.Schema({
   name: { type: String, reuqired: [true, 'user name is required'] },
   email: { type: String, reuqired: [true, 'user email is required'], unique: true },
   password: { type: String, reuqired: [true, 'user password is required'] },
   isAdmin: { type: String, default: 'user' },
   tokens: [{ token: { type: String, required: [true, 'user token is required'] } }],
   userProfileImage: { type: String, default: 'defaultUser.jpeg' },
   phone: { type: Number },
   dateOfBirth: { type: Date },
   createdAt: { type: Date, default: Date.now },
   exportsHistory: [
      {
         historyType: { type: String, required: [true, 'type is required'] },
         date: { type: Date, default: Date.now },
         fileName: { type: String, required: [true, 'export file name is required'] },
         exportProducts: { type: Number },
      },
   ],
   cart: [
      {
         cartItem: { type: mongoose.Types.ObjectId, ref: 'product' },
         qty: { type: Number },
         subVariationProduct: { type: Boolean, default: false },
         parentProductId: { type: mongoose.Types.ObjectId, ref: 'product' },
      },
   ],
   wishLists: [{ ItemId: { type: mongoose.Types.ObjectId, ref: 'product' } }],
   myAddress: [
      {
         phone: { type: String },
         country: { type: String, required: [true, 'Country name is required'] },
         state: { type: String, required: [true, 'state is required'] },
         city: { type: String, required: [true, 'city name is required'] },
         address: { type: String, required: [true, 'address is required'] },
         IsDefault: { type: Boolean, default: false },
      },
   ],
});

userSchema.index({ 'myAddress.country': 1, 'myAddress.address': 1, 'myAddress.state': 1 });

userSchema.methods.genrateUserToken = async function () {
   try {
      const token = await jwt.sign({ _id: this.id.toString(), name: this.name, email: this.email, isAdmin: this.isAdmin }, JWT_TOKEN);
      this.tokens = this.tokens.concat({ token });
      this.save();
      return token;
   } catch (err) {
      console.log(err);
   }
};

userSchema.pre('save', async function (next) {
   try {
      if (this.isModified('password')) {
         const hashPassword = await bcryptjs.hash(this.password, 11);
         this.password = hashPassword;
      }
      next();
   } catch (err) {
      console.log(err);
   }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
