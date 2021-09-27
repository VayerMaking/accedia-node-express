const indexRouter = require("../routes/index.routes");
const uploadRouter = require("../routes/upload.routes");

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/upload", uploadRouter);
};
