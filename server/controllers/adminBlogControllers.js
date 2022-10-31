const AppError = require('../helpers/appError');
const { catchAsync, imageCompress, fetchLimitDocument } = require('../helpers/helpers');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const blogModel = require('../model/schema/blogSchema');
const blogCategorieModel = require('../model/schema/blogCategoriesSchema');

const createNewBlog = catchAsync(async function (req, res, next) {
   const { name, description, isFeature, content, blogStatus, categorie } = req.body;

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

   if (!!categorie) {
      insertData.categorie = categorie;
   }

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
      if (!!insertData.categorie) {
         //once document is saved then also insert the documend id inside the categorie document for keep trakc how much document inside the category.
         await blogCategorieModel.updateOne(
            { _id: categorie },
            { $push: { blogs: { blogId: insertBlogDocument._id } } }
         );
      }

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
    * if the prev category is change mean the new selected category is not equl to the prev selected category.
    * then we want to first remove the blog post from the prev category. and insrt into the new category docuemnt.
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

   if (!!req.body.categorie) {
      updateObject.categorie = req.body.categorie;
   }

   const findPrevBlogCategorieIds = await blogModel.findOne({ _id: id });

   if (findPrevBlogCategorieIds) {
      // grab the prevwise values from the document.
      const prevBlogCategorieId = findPrevBlogCategorieIds.categorie;
      // grab the blog id
      const blogId = findPrevBlogCategorieIds._id;

      if (!!updateObject.categorie && !!prevBlogCategorieId && updateObject.categorie !== prevBlogCategorieId) {
         // if the prewise values and the new values is not same then we want to store the new id inside the new document. which is selected by the admin. and also the remove the id from the prewise categorie collections.
         const findIdIsExistsInBlogCategorieCol = await blogCategorieModel.findOne({
            _id: prevBlogCategorieId,
            'blogs.blogId': blogId,
         });

         // if the is is find into the prevwise document then first remove the id remove the pre collections and push inside the new collections.
         if (findIdIsExistsInBlogCategorieCol) {
            const insertIntoNewDocument = await blogCategorieModel.updateOne(
               { _id: updateObject.categorie },
               { $push: { blogs: { blogId: blogId } } }
            );

            if (!!insertIntoNewDocument.modifiedCount) {
               // remove document from prev blog categorie collections.
               await blogCategorieModel.updateOne(
                  { _id: prevBlogCategorieId },
                  { $pull: { blogs: { blogId: blogId } } }
               );
            }
         }
      } else {
         // if the blog document don't have any categori and admin want to update the categori.
         await blogCategorieModel.updateOne({ _id: updateObject.categorie }, { $push: { blogs: { blogId: blogId } } });
      }
   }

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

const createBlogCategory = catchAsync(async function (req, res, next) {
   const { name } = req.body;
   if (!name) {
      next(new AppError('Blog categories name is required!'));
   }
   const insertObts = Object.assign(req.body);

   // check the categorie is exists or not.
   // if the admin selecte any parent category then find the parent categories and push inside that categories document.
   const checkIsExists = await blogCategorieModel.findOne({ name: insertObts.name });

   if (checkIsExists) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Categorie is already exist',
      });
   } else {
      const insertNewBlogCategories = await blogCategorieModel(insertObts).save();

      if (insertNewBlogCategories) {
         return res.status(httpStatusCodes.CREATED).json({
            success: true,
            message: 'Categorie saved',
            document: insertNewBlogCategories,
         });
      } else {
         return res.status(httpStatusCodes.INTERNAL_SERVER).json({
            success: false,
            message: 'server error',
         });
      }
   }
});

const getBlogCategories = catchAsync(async function (req, res, next) {
   const findAllBlogCategories = await blogCategorieModel.find({});
   if (findAllBlogCategories) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         categories: findAllBlogCategories,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'server error',
      });
   }
});

const updateSingleBlogPostCategorie = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   if (!id) {
      next(new AppError('blog categorie id is required'));
   }
   const udpateDataObject = Object.assign(req.body);
   const findBlogCategorieAndUpdate = await blogCategorieModel.updateOne({ _id: id }, { $set: udpateDataObject });
   if (!!findBlogCategorieAndUpdate.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Blog categorie updated',
      });
   } else {
      return res.status(httpStatusCodes.OK).json({
         success: false,
         message: 'Blog categorie already updated',
      });
   }
});

const deleteSingleBlogCategorie = catchAsync(async function (req, res, next) {
   const { id } = req.params;
   if (!id) {
      next(new AppError('blog categorie id is required'));
   }
   const findAndDeletBlogCategorie = await blogCategorieModel.deleteOne({ _id: id });
   if (!!findAndDeletBlogCategorie.deletedCount) {
      return res.status(200).json({
         success: true,
         message: 'Blog Categorie deleted',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'server error',
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
   createBlogCategory,
   getBlogCategories,
   updateSingleBlogPostCategorie,
   deleteSingleBlogCategorie,
};
