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

module.exports = { imageCompress, catchAsync };
