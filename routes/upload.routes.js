var express = require("express");

var router = express.Router();
const uploadController = require("../controllers/upload.controller");
router.get("/", uploadController.loadPage);

router.post("/", uploadController.upload);

module.exports = router;
