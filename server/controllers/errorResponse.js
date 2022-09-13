// ERROR: Return error response
const erroResponse = function (res) {
   return res.status(200).json({
      message: "someting worng",
   });
};

module.exports = {
   erroResponse,
};
