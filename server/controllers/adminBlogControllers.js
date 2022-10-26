const AppError = require('../helpers/appError');
const { catchAsync, imageCompress, fetchLimitDocument } = require('../helpers/helpers');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const blogModel = require('../model/schema/blogSchema');

const createNewBlog = catchAsync(async function (req, res, next) {
   const { name, description, isFeature, content, blogStatus } = req.body;

   if (!name) {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'Blog post name is required',
      });
   }

   const insertData = {
      name,
      description,
      isFeature,
      content,
      status: blogStatus,
   };
   let insertBlogDocument;

   const file = req.files[0];

   if (file) {
      const originalname = file.originalname;
      const path = file.path;
      insertData.blogImage = originalname;

      await imageCompress(path, 130, 'blogPostCompressImages', originalname);

      insertBlogDocument = await blogModel(insertData).save();
   } else {
      insertBlogDocument = await blogModel(insertData).save();
   }

   if (insertBlogDocument) {
      return res.status(httpStatusCodes.CREATED).json({
         success: true,
         message: 'Blog post saved',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const getBlogPosts = catchAsync(async function (req, res, next) {
   const BLOG_LIMIT = 10;
   const page = req.query.page || 0;
   await fetchLimitDocument(blogModel, page, res, httpStatusCodes, BLOG_LIMIT, 'posts');
});

const getSingleBlogPost = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   const posts = await blogModel.findOne({ _id: id });

   if (posts) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         singlePost: posts,
      });
   }
});

const updateSingleBlogPost = catchAsync(async function (req, res, next) {
   /**
    * grab the updated document id.
    * once the document is find from the database then. check the admin update the filed or not.
    * if the admin is not update the filed and the old values or the new values is the same then we don't neet to update the  document filed.
    * check also the category if the admin update the category or not.
    * if the prev category is change mean the new selected category is not equl to the prev selected category. [-]
    * then we want to first remove the blog post from the prev category. and insrt into the new category docuemnt. [-]
    * alost compress the images when the admin update new images.
    */

   const { id } = req.body;

   if (!id) {
      next(new AppError('Blog id is required!'));
   }

   const updateObject = {
      name: req.body.name,
      description: req.body.description,
      isFeature: req.body.isFeature,
      content: req.body.content,
      status: req.body.blogStatus,
   };

   const file = req.files[0];
   let findBlogPostAndUpdate;

   if (file) {
      const originalname = file.originalname;
      const path = file.path;
      updateObject.blogImage = originalname;
      await imageCompress(path, 130, 'blogPostCompressImages', originalname);
      findBlogPostAndUpdate = await blogModel.updateOne({ _id: id }, { $set: updateObject });
   } else {
      findBlogPostAndUpdate = await blogModel.updateOne({ _id: id }, { $set: updateObject });
   }

   if (!!findBlogPostAndUpdate.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Blog post updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Blog post update already',
      });
   }
});

const deleteSingleBlogPost = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   console.log(id);

   if (!id) {
      next(new AppError('Blog id is required!'));
   }

   const findAndDeletePost = await blogModel.deleteOne({ _id: id });
   if (!!findAndDeletePost.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Blog post deleted',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'Internal server error',
      });
   }
});

const deleteAllBlogs = catchAsync(async function (req, res, next) {
   const removerAllBlogs = await blogModel.deleteMany({});
   if (!!removerAllBlogs.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'All blog posts deleted',
      });
   }
});

module.exports = {
   createNewBlog,
   getBlogPosts,
   getSingleBlogPost,
   updateSingleBlogPost,
   deleteSingleBlogPost,
   deleteAllBlogs,
};
