const path = require('path');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = process.env.JWT_TOKEN;
const fs = require('fs');
const fetch = require('node-fetch');
const productModel = require('../model/schema/productSchema');

const imageCompress = async function (imagePath, imageQulity, folder, originalname) {
   /**
    * @imagePath  when the user want to upload the product image then first store the image into the files.then grab the path of the image like updlaod/images/...jpg.
    * @imageQulity set the image compress size and the qulity.
    * @folder which folder we want to store the compress image. ex. upload/imagecompress/...
    * @originalname real name of the file which is uploaded by the admin.
    * grab all the information and then compress the image.
    */

   await sharp(imagePath)
      .resize(imageQulity, imageQulity)
      .jpeg({ quality: 100 })
      .toFile(path.join(__dirname, '..', 'upload', folder, originalname));
};

const catchAsync = (fn) => {
   /**
    * @fn function which is wrapperd by the catchAsync function to use the DRY method.
    * passdown the request, response and the next argumens into the innerfunction.
    */

   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         console.log(err);
      });
   };
};

const fetchLimitDocument = async function (
   collection,
   page,
   res,
   httpStatusCodes,
   DOCUMENT_LIMIT,
   filed,
   item = undefined
) {
   /**
    * @collection which mongodb collections db we want to update and get back the infomations.
    * @page numbers of the documents. for making the pagination effect.
    * @param { Object} res
    * @httpStatusCodes http status codes.
    * @DOCUMENT_LIMIT how much documents we want to send back to the client.
    * @filed send back object filed name.
    * @item projection object
    */
   let documents, findData;
   if (collection === productModel) {
      documents = await collection.countDocuments({});
      findData = await collection
         .find({}, item ? item : {})
         .populate('brand')
         .populate('category')
         .limit(DOCUMENT_LIMIT)
         .skip(page * DOCUMENT_LIMIT);
   } else {
      documents = await collection.countDocuments({});
      findData = await collection
         .find({}, item ? item : {})
         .limit(DOCUMENT_LIMIT)
         .skip(page * DOCUMENT_LIMIT);
   }

   if (filed) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         totalPages: Math.ceil(documents / DOCUMENT_LIMIT - 1),
         totalDocuments: documents,
         [`${filed}`]: findData,
      });
   } else {
      throw new Error('somting worng with fetching document');
   }
};

const convertObjectDataIntoArray = function (selectedProduct) {
   let selectedProductAr = [];

   for (let item in selectedProduct) {
      selectedProductAr.push({
         productId: item,
         quntity: selectedProduct[item].quntity,
         salePrice: selectedProduct[item].salePrice,
      });
   }

   return selectedProductAr;
};

const tokenVarifyFunction = function (cookie, userToken) {
   /**
    * @token use login and sign in token to varify the use is valid or not.
    * @tokenVarify varifying the user.
    * @tokenVarify return object if the user is valid.
    * @_id @isAdmin values which is grab from the token varification.
    * @return @_id @isAdmin
    */
   let tokenVarify;
   if (userToken) {
      tokenVarify = jwt.verify(userToken, JWT_TOKEN);
   } else {
      const { token } = cookie.user;
      tokenVarify = jwt.verify(token, JWT_TOKEN);
   }
   const { _id, isAdmin } = tokenVarify;
   return { _id, isAdmin };
};

const productExportFolderPath = function (fileName) {
   /**
    * @folderPath .. => one folder up level , datafiles/exportsData/products/filename
    */
   const folderPath = path.join(__dirname, '..', 'dataFiles', 'exportData', 'Products', fileName);
   return folderPath;
};

const downloadImageFromWeb = async function (url, imagePath, compressImageFolderPath, imageName) {
   try {
      /**
       * @url url which is used for the download images from the web.
       * @imagePath full path name of the image is exits.
       * @imageName original image.
       * grab the image url from the csv json object.
       * covert url into the array, ['https', 'www.com', 'imagename.jpg']
       * get the last value from the array for store the original name of the image.
       * check the image is already exits or not. if the image already exits then no need to download again.
       * if there is no image exists then download the image from the web.
       * @return object
       */

      fs.exists(imagePath, (exists) => {
         if (exists) {
            console.log('file exists');
         } else {
            const response = fetch(url).then((resp) => resp.buffer());
            response.then((data) => {
               fs.writeFile(imagePath, data, async (err) => {
                  if (err) {
                     next(new AppError(err));
                  }

                  await imageCompress(imagePath, 130, compressImageFolderPath, imageName);
               });
            });
         }
      });

      return { imageName };
   } catch (err) {
      console.log(err);
   }
};

const numberConvert = function (string) {
   const number = string.replaceAll(',', '');
   return +number;
};

const replaceAndGroupDate = function (time, endDate) {
   /**
    * @tm convert the time with array and selected sapcific elem from the array.
    * @endDateWithTime replace h-m-s time with selected date.
    * @return replace time.
    */
   const tm = time.split(' ')[4];
   const endDateWithTime = endDate.replace('00:00:00', tm);
   return endDateWithTime;
};

const dataConvertor = function (dateOfStart, dateOfStartTime, dateOfend, dateOfEndTime) {
   /**
    * @startDate start sale date d-y-m.
    * @startDateTime start date time h-m-s
    * @endDate end flash sale date.
    * @endDateTime end flash sale date time.
    * @startTimeWithDate reaplce start date with time.
    * @endTimeWithDate replace end date with time.
    * @return { startTimeWithDate, endTimeWithDate }
    */
   const startDate = new Date(dateOfStart).toString();
   const startDateTime = new Date(dateOfStartTime).toString();
   const endDate = new Date(dateOfend).toString();
   const endDateTime = new Date(dateOfEndTime).toString();

   const startTimeWithDate = replaceAndGroupDate(startDateTime, startDate);
   const endTimeWithDate = replaceAndGroupDate(endDateTime, endDate);

   return { startTimeWithDate, endTimeWithDate };
};

const convertFormateDate = function (date) {
   /**
    * @splitDateAr covenrt date into the miliseconds first then remove the last 3 digits from the miliseconds and then convert str into the int.
    * @replace replaced miliseconds date.
    */
   const splitDateAr = parseInt(date.getTime().toString().slice(0, -3));
   return splitDateAr;
};

module.exports = {
   imageCompress,
   catchAsync,
   fetchLimitDocument,
   convertObjectDataIntoArray,
   tokenVarifyFunction,
   productExportFolderPath,
   downloadImageFromWeb,
   numberConvert,
   convertFormateDate,
   dataConvertor,
};
