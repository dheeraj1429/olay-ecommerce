require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const helmat = require("helmet");
const logger = require("morgan");
const port = process.env.PORT || 8000;
const path = require("path");
const cors = require("cors");

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

// server
databaseConnectionFunction(() => {
   http.listen(port, () => {
      console.log(`server is running port ${port}`);
   });
});
