const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
<<<<<<< HEAD
const { json } = express;
=======
>>>>>>> b84e4fd71a0b2bc304672e1244ac84f17cae1bb9
// const helmet = require("helmet");
const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(json());
app.use(morgan("dev"));
// app.use(helmet());
app.use(express.json());
<<<<<<< HEAD
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
=======

>>>>>>> b84e4fd71a0b2bc304672e1244ac84f17cae1bb9
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       connectSrc: ["'self'", "http://127.0.0.1:8000"],
//     },
//   })
// );

module.exports = app;
