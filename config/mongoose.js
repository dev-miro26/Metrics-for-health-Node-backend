const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(
    process.env.NODE_ENV !== "production"
      ? process.env.MONGODB_URI_DEVELOPEMNT
      : process.env.MONGODB_URI_PRODUCTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => console.error("Connection error :" + err));
const db = mongoose.connection;

module.exports = db;
