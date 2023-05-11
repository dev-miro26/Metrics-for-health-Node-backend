// const app = require("./config/express");
// const mongoose = require("./config/mongoose");

// require("dotenv").config();
// //middlewares

// const port = process.env.PORT;

// mongoose.on("connected", () => {
//   app.listen(port || 8000, () => {
//     require("./routes/routes")(app);
//     console.log("----------Metric LogoBook -----------");
//     console.log(`Server app listening on port ${port}`);
//   });
// });
// module.exports = app;

const path = require("path");
const createError = require("http-errors");
const cors = require("cors");
const express = require("express");
// const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);
// const storeOptions = require("./config/storeOptions");
const logger = require("morgan");
const authRoutes = require("./routes/auth");
const metricsRoutes = require("./routes/metrics");
const groupRoutes = require("./routes/group");

const { json, urlencoded } = express;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

// app.use(
//   session({
//     name: "sess_calendapp",
//     secret: process.env.SESS_SECRET,
//     store: new MongoStore(storeOptions),
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60,
//       httpOnly: false,
//       secure: false,
//     },
//   })
// );

app.use("/api/auth", authRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/group", groupRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
