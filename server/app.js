require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const helmat = require("helmet");
const logger = require("morgan");
const port = process.env.PORT || 8000;
const path = require("path");
const cors = require("cors");
const numCPUs = require("node:os").cpus().length;
const cluster = require("node:cluster");

// database connection
const databaseConnectionFunction = require("./model/db/db");

// routes files
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");

// middlewares
app.use(cors("*"));
app.options("*", cors());
app.use(helmat());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "upload")));
app.use(express.static(path.join(__dirname, "build")));
app.use(logger());

// routes
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

// server the build file.
app.all("*", (req, res) => {
   res.sendFile(path.join(__dirname, "build", "index.html"));
});

// catch the error.
app.use((err, req, res, next) => {
   console.log(err.stack);

   err.statusCode = err.statusCode || 500;
   err.status = err.status || "error";

   res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
   });
});

if (cluster.isPrimary) {
   console.log(`Primary ${process.pid} is running`);

   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }

   cluster.on("exit", (Worker, code, signal) => {
      console.log(`Worker ${Worker.process.pid} died`);
   });
} else {
   databaseConnectionFunction(() => {
      // server
      http.listen(port, () => {
         console.log(`server is running port ${port}`);
      });
   });

   console.log(`Woker ${process.pid} is running`);
}

// fs.readFile(path.join(__dirname, "config.json"), "utf-8", (err, data) => {
//    if (err) throw err;
//    const configObject = JSON.parse(data);
//    const { DATABASE_NAME, DATABASE_URL, DATABASE_USER_ACCESS_PASSWORD } = configObject;

//    if (!!DATABASE_NAME && !!DATABASE_URL && !!DATABASE_USER_ACCESS_PASSWORD) {
//       /**
//        * one the user fill the all details then check the database is connection is stable or not.
//        */
//       databaseConnectionFunction();
//    }
// });
