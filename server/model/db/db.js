const mongoose = require("mongoose");
const URL = process.env.URL;

const databaseConnectionFunction = function (callback) {
    mongoose
        .connect(URL)
        .then((res) => {
            callback();
            console.log("database connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = databaseConnectionFunction;
