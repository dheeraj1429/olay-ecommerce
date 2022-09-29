const path = require("path");
const sharp = require("sharp");

const imageCompress = async function (imagePath, imageQulity, folder, originalname) {
   await sharp(imagePath)
      .resize(imageQulity, imageQulity)
      .jpeg({ quality: 100 })
      .toFile(path.join(__dirname, "..", "upload", folder, originalname));
};

const catchAsync = (fn) => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => {
         console.log(err);
      });
   };
};

const fetchLimitDocument = async function (collection, page, res, httpStatusCodes, DOCUMENT_LIMIT, filed, item = undefined) {
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

module.exports = { imageCompress, catchAsync, fetchLimitDocument };
