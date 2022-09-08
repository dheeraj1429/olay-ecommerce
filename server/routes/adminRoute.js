const express = require("express");
const route = express.Router();

const adminController = require("../controllers/adminControllers");

// Apis
route.post("/admin-sign-in", adminController.adminSignIn);

module.exports = route;
