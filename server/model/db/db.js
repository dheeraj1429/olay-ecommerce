const mongoose = require("mongoose");
const URL = process.env.URL;

const databaseConnectionFunction = function (callback) {
   mongoose
      .connect(URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      .then((res) => {
         console.log("database connected");
         callback();
      })
      .catch((err) => {
         console.log(err);
      });
};

module.exports = databaseConnectionFunction;
