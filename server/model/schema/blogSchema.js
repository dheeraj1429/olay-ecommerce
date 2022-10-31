const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'please enter the blog post name'] },
   description: { type: String },
   isFeature: { type: Boolean, default: false },
   metaContent: { type: String },
   status: { type: String, default: 'Draft' },
   categorie: { type: mongoose.Types.ObjectId, ref: 'blogCategorie' },
   blogImage: { type: String },
   content: { type: String },
   createdAt: { type: Date, default: Date.now },
});

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;
