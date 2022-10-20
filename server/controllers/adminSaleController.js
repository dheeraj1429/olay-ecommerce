const { catchAsync, fetchLimitDocument, dataConvertor, convertObjectDataIntoArray } = require('../helpers/helpers');
const httpStatusCodes = require('../helpers/httpStatusCodes');
const saleModel = require('../model/schema/flashSaleSchema');
const Timer = require('../helpers/timer');

// store the flash sale data into the database and the send back to reponse.
const storeSaleInfo = async function (data, response) {
   try {
      let insertNewSale = await saleModel(data);
      let saleSave = await insertNewSale.save();

      if (saleSave) {
         const documentData = {
            name: saleSave.name,
            _id: saleSave._id,
            startTimeWithDate: saleSave.startTimeWithDate,
            endTimeWithDate: saleSave.endTimeWithDate,
         };

         const newSaleTimer = new Timer(documentData);
         newSaleTimer.startTimer();

         return response.status(httpStatusCodes.CREATED).json({
            success: true,
            message: 'new sale saved',
         });
      } else {
         return response.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: 'Internal server error',
         });
      }
   } catch (err) {
      console.log(err);
   }
};

const insertNewProductFlashSale = catchAsync(async function (req, res, next) {
   const { name, statusInfo, label, dateOfStart, dateOfStartTime, dateOfend, dateOfEndTime } = req.body;
   const findIsSaleExists = await saleModel.findOne({ name });

   /**
    * Convert all date into string date
    * @startTimeWithDate start date where we want to start the flash sale.
    * @endTimeWithDate end date with time.
    */

   const { startTimeWithDate, endTimeWithDate } = dataConvertor(dateOfStart, dateOfStartTime, dateOfend, dateOfEndTime);

   const data = {
      name,
      statusInfo,
      dateOfStart,
      dateOfStartTime,
      dateOfend,
      dateOfEndTime,
      startTimeWithDate,
      endTimeWithDate,
   };

   if (findIsSaleExists) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Sale is alrady exists',
      });
   } else {
      if (req.body?.selectedProduct) {
         /**
          * store the name or the status info the database.
          * for the sub selected product. first loop over the the object to get the access the object
          * key and values and then selcted the each sub object key and values then then push inside
          * the sale model.
          */

         data.products = convertObjectDataIntoArray(req.body.selectedProduct);

         await storeSaleInfo(data, res);
      } else if (name && !label) {
         await storeSaleInfo(data, res);
      } else if (name && label) {
         data.label = label;
         await storeSaleInfo(data, res);
      }
   }
});

const getAllFlashSales = catchAsync(async function (req, res, next) {
   const page = req.query.page;
   if (!page) next(new AppError('flash sale page number is required!'));
   const DOCUMENT_LIMIT = 10;
   await fetchLimitDocument(saleModel, page, res, httpStatusCodes, DOCUMENT_LIMIT, 'sales', {
      products: 0,
   });
});

const deleteAllFlashSales = catchAsync(async function (req, res, next) {
   const deleteAllSales = await saleModel.deleteMany({});

   if (!!deleteAllSales.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'All Flash sales deleted',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: 'Internal server error',
      });
   }
});

const deleteSingleFlashSale = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      next(new AppError('flash sale id is required!'));
   }

   const findFlashSaleAndDelete = await saleModel.deleteOne({ _id: id });

   if (!!findFlashSaleAndDelete.deletedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Flash sales deleted',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: 'Internal server error',
      });
   }
});

const getSinlgeFlashSale = catchAsync(async function (req, res, next) {
   const id = req.params.id;

   if (!id) {
      next(new AppError('Flash sale id is required!'));
   }

   const findSinlgeFlashSale = await saleModel
      .findOne({ _id: id })
      .populate('products.productId', { name: 1, productImage: 1 });

   if (findSinlgeFlashSale) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         sale: findSinlgeFlashSale,
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: 'Internal server error',
      });
   }
});

const updateFlashSaleInfo = async function (collection, flashSaleId, data, res) {
   try {
      const findAndUpdateFlashSaleDetails = await collection.updateOne({ _id: flashSaleId }, { $set: data });
      if (findAndUpdateFlashSaleDetails.acknowledged && !!findAndUpdateFlashSaleDetails.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'Flash sale updated',
         });
      } else if (findAndUpdateFlashSaleDetails.acknowledged && !findAndUpdateFlashSaleDetails.modifiedCount) {
         return res.status(httpStatusCodes.OK).json({
            success: true,
            message: 'Flash sale alrady updated',
         });
      } else {
         next(new AppError("Can't update the flash sale document"));
      }
   } catch (err) {
      console.log(err);
   }
};

const updateSingleFlashSale = catchAsync(async function (req, res, next) {
   const { flashSaleId } = req.body;
   if (!flashSaleId) {
      next(new AppError('Flash sale id is required for update the sub variaitons products data'));
   }
   const { name, statusInfo, label, dateOfStart, dateOfStartTime, dateOfend, dateOfEndTime } = req.body;
   const { startTimeWithDate, endTimeWithDate } = dataConvertor(dateOfStart, dateOfStartTime, dateOfend, dateOfEndTime);

   const data = {
      name,
      statusInfo,
      dateOfStart,
      dateOfStartTime,
      dateOfend,
      dateOfEndTime,
      startTimeWithDate,
      endTimeWithDate,
   };

   if (req.body?.selectedProduct && label) {
      data.label = label;
      data.products = convertObjectDataIntoArray(req.body.selectedProduct);
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (!label && req.body?.selectedProduct) {
      data.products = convertObjectDataIntoArray(req.body.selectedProduct);
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (!label && name) {
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   } else if (label && name) {
      data.label = label;
      await updateFlashSaleInfo(saleModel, flashSaleId, data, res);
   }
});

const deleteFlashSaleProduct = catchAsync(async function (req, res, next) {
   const { productId, parentSaleId } = req.query;

   if (!productId) next(new AppError('Flash sale product id is required!'));
   if (!parentSaleId) next(new AppError('Flash sale id is required!'));

   const findFlashProductAndRemove = await saleModel.updateOne(
      { _id: parentSaleId },
      {
         $pull: {
            products: { productId: productId },
         },
      }
   );

   if (!!findFlashProductAndRemove.modifiedCount) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         message: 'Flash sale product removed',
      });
   } else {
      return res.status(httpStatusCodes.INTERNAL_SERVER).json({
         message: 'Internal server error',
      });
   }
});

module.exports = {
   insertNewProductFlashSale,
   getAllFlashSales,
   deleteAllFlashSales,
   deleteSingleFlashSale,
   getSinlgeFlashSale,
   updateSingleFlashSale,
   deleteFlashSaleProduct,
};
