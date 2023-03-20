const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const helmet = require("helmet");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

module.exports = app;
