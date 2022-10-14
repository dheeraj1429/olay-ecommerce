const { catchAsync } = require('../helpers/helpers');
const productModel = require('../model/schema/productSchema');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const categoryModel = require('../model/schema/productCategorySchema');
const saleModel = require('../model/schema/FlashSaleSchema');
const userModel = require('../model/schema/userSchema');

const groupDataFunction = async function (collection, field) {
   const genrateReport = await collection.aggregate([
      {
         $project: {
            _id: 0,
            created: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
         },
      },
      { $group: { _id: { date: '$created' }, [field]: { $sum: 1 } } },
   ]);

   return genrateReport;
};

const getProductGenralReport = catchAsync(async function (req, res, next) {
   const genrateProductReport = await groupDataFunction(productModel, 'totalProductUploded');

   if (genrateProductReport) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         report: genrateProductReport,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
   }
});

const getAllSignInUsers = catchAsync(async function (req, res, next) {
   const genrateUserReport = await groupDataFunction(userModel, 'TotalUserSignIn');

   if (genrateUserReport) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         report: genrateUserReport,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: true,
         message: 'Internal server error',
      });
   }
});

module.exports = {
   getProductGenralReport,
   getAllSignInUsers,
};
