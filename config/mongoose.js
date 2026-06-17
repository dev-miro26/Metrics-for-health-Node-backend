const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const env = process.env.NODE_ENV || "development";
const uri =
  env === "test"
    ? process.env.MONGODB_URI_TEST
    : env === "production"
    ? process.env.MONGODB_URI_PRODUCTION
    : process.env.MONGODB_URI_DEV || process.env.MONGODB_URI_PRODUCTION;

mongoose
  .connect(uri)
  .catch((err) => console.error("Connection error :" + err));
const db = mongoose.connection;

module.exports = db;
