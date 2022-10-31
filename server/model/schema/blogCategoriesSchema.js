const mongoose = require('mongoose');

const blogCategorieSchema = new mongoose.Schema({
   name: { type: String, required: [true, 'Blog categories name is required'] },
   description: { type: String },
   categorieStatus: { type: String, default: 'Draft' },
   IsDefault: { type: Boolean },
   IsFeatured: { type: Boolean },
   createdAt: { type: Date, default: Date.now },
   blogs: [{ blogId: { type: mongoose.Types.ObjectId, ref: 'blog' } }],
});

blogCategorieSchema.index({ name: 1 });

const blogCategorieModel = mongoose.model('blogCategorie', blogCategorieSchema);

module.exports = blogCategorieModel;
