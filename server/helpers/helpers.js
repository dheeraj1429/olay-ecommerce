const path = require("path");
const sharp = require("sharp");

const imageCompress = async function (imagePath, imageQulity, folder, originalname) {
   await sharp(imagePath)
      .resize(imageQulity, imageQulity)
      .jpeg({ quality: 100 })
      .toFile(path.join(__dirname, "..", "upload", folder, originalname));
};

module.exports = { imageCompress };
