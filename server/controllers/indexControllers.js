const { catchAsync } = require('../helpers/helpers');
const productModel = require('../model/schema/productSchema');
const httpStatusCodes = require('../helpers/httpStatusCodes');

const getTrandingProducts = catchAsync(async function (req, res, next) {
   const findProducts = await productModel.aggregate([
      { $match: { salePrice: { $exists: true } } },
      { $project: { _id: 1, name: 1, price: 1, productImage: 1, stockStatus: 1, salePrice: 1 } },
      { $limit: 4 },
   ]);

   if (findProducts) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         products: findProducts,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         success: false,
         message: 'internal server error',
      });
   }
});

module.exports = {
   getTrandingProducts,
};
