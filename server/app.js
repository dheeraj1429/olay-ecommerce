require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const logger = require('morgan');
const port = process.env.PORT || 8000;
const path = require('path');
const cors = require('cors');
const numCPUs = require('node:os').cpus().length;
const cluster = require('node:cluster');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_TOKEN;
const fs = require('fs');

const options = {
   key: fs.readFileSync(path.join(__dirname, './cert/key.pem')),
   cert: fs.readFileSync(path.join(__dirname, './cert/cert.pem')),
};

const https = require('http').createServer(options, app);

// database connection
const databaseConnectionFunction = require('./model/db/db');

// routes files
const adminRoute = require('./routes/adminRoute');
const adminToolsRoute = require('./routes/adminToolsRoute');
const authRoute = require('./routes/authRoute');
const indexRoute = require('./routes/indexRoute');

// middlewares
app.set('view engine', 'ejs');
app.use(
   cors({
      origin: 'http://localhost:3000',
   })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(logger());

// check is there access token headers if the user don't have any access token then block the user.
app.use(async function (req, res, next) {
   const xApiKey = req.headers['x-api-key'];
   if (xApiKey) {
      try {
         const { key } = jwt.verify(xApiKey, JWT_SECRET);
         if (key === process.env.KEY) next();
      } catch (err) {
         return res.status(200).json({
            message: 'invalid access token',
         });
      }
   } else {
      return res.status(200).json({
         message: 'access token required',
      });
   }
});

// routes
app.use('/index', indexRoute);
app.use('/admin', adminRoute);
app.use('/admin/tools', adminToolsRoute);
app.use('/auth', authRoute);

// server the build file.
app.all('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch the error.
app.use((err, req, res, next) => {
   console.log(err.stack);

   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

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

   cluster.on('exit', (Worker, code, signal) => {
      console.log(`Worker ${Worker.process.pid} died`);
   });
} else {
   databaseConnectionFunction(() => {
      // server
      https.listen(port, () => {
         console.log(`server running on port https://localhost:${port}`);
      });
   });

   console.log(`Woker ${process.pid} is running`);
}
