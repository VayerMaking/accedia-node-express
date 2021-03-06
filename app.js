var createError = require("http-errors");
var express = require("express");
require("dotenv").config();
// var indexRouter = require('./routes/index.routes');
// var uploadRouter = require('./routes/upload.routes');

global.__basedir = __dirname;

var app = express();

require("./config/express")(app);
require("./config/routes")(app);
require("./config/db");
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.APP_PORT, () =>
  console.log("Listening on port: ", process.env.APP_PORT)
);

module.exports = app;
