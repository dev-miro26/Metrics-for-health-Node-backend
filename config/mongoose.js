const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error("Connection error :" + err));
const db = mongoose.connection;

module.exports = db;
