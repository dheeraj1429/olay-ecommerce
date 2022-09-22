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
app.use(
   cors({
      origin: "http://localhost:3000",
   })
);
app.options("*", cors());
app.use(helmat());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "upload")));
app.use(logger());

// routes
app.use("/admin", adminRoute);
app.use("/auth", authRoute);

if (cluster.isPrimary) {
   console.log(`Primary ${process.pid} is running`);

   for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
   }

   cluster.on("exit", (Worker, code, signal) => {
      console.log(`Worker ${Worker.process.pid} died`);
   });
} else {
   // server
   databaseConnectionFunction(() => {
      http.listen(port, () => {
         console.log(`server is running port ${port}`);
      });
   });

   console.log(`Woker ${process.pid} is running`);
}
