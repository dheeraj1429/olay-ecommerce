const httpStatusCodes = require("../helpers/httpStatusCodes");

// ERROR: Return error response
const erroResponse = function (res) {
   return res.status(httpStatusCodesatusCodes.INTERNAL_SERVER).json({
      message: "someting worng",
   });
};

module.exports = {
   erroResponse,
};
