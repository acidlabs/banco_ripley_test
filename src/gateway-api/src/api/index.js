const express = require("express");

const auth = require("./auth");

const routes = express.Router();

routes.use("/auth", auth);

module.exports = routes;
