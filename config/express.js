var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
var express = require("express");

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  // view engine setup
  app.set("views", "./views");
  app.set("view engine", "pug");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static("../public"));
  app.use(fileUpload());
};
