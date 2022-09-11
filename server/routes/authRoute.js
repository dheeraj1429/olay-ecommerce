const express = require("express");
const route = express.Router();

const authControllers = require("../controllers/authController");

route.post("/admin-sign-in", authControllers.adminSignIn);

module.exports = route;
