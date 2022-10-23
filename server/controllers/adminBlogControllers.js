const { catchAsync, imageCompress } = require('../helpers/helpers');
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
      blogStatus,
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

module.exports = {
   createNewBlog,
};
