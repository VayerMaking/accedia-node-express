const Pool = require("pg").Pool;
require("dotenv").config();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../config/db")[environment];
const database = require("knex")(configuration);
//const validate = require('./validation.js');
const uploadFile = async (jsonArray, res) => {
  console.log("parsed array: ", jsonArray);
  const chunkSize = 2;
  database.batchInsert("uploaded_files", jsonArray, chunkSize);
};

module.exports = { uploadFile };
