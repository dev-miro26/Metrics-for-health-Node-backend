const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { json } = express;
const helmet = require("helmet");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(json());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://127.0.0.1:8000"],
    },
  })
);

module.exports = app;
