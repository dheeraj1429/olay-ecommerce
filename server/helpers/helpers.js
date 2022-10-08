const path = require("path");
const sharp = require("sharp");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

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
      .toFile(path.join(__dirname, "..", "upload", folder, originalname));
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
   const documents = await collection.countDocuments({});
   const findData = await collection
      .find({}, item ? item : null)
      .limit(DOCUMENT_LIMIT)
      .skip(page * DOCUMENT_LIMIT);

   if (filed) {
      return res.status(httpStatusCodes.OK).json({
         success: true,
         totalPages: Math.ceil(documents / DOCUMENT_LIMIT - 1),
         totalDocuments: documents,
         [`${filed}`]: findData,
      });
   } else {
      throw new Error("somting worng with fetching document");
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

const tokenVarifyFunction = function (cookie) {
   /**
    * @token use login and sign in token to varify the use is valid or not.
    * @tokenVarify varifying the user.
    * @tokenVarify return object if the user is valid.
    * @_id @isAdmin values which is grab from the token varification.
    * @return @_id @isAdmin
    */
   const { token } = cookie.user;
   const tokenVarify = jwt.verify(token, JWT_TOKEN);
   const { _id, isAdmin } = tokenVarify;
   return { _id, isAdmin };
};

const productExportFolderPath = function (fileName) {
   /**
    * @folderPath .. => one folder up level , datafiles/exportsData/products/filename
    */
   const folderPath = path.join(__dirname, "..", "dataFiles", "exportData", "Products", fileName);
   return folderPath;
};

module.exports = {
   imageCompress,
   catchAsync,
   fetchLimitDocument,
   convertObjectDataIntoArray,
   tokenVarifyFunction,
   productExportFolderPath,
};
