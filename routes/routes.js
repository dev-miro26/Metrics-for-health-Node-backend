const express = require("express");
const authRountes = require("./auth");
const metricsRoutes = require("./metrics");
module.exports = (app) => {
  //   const router = express.Router();

  //   //sample route
  //   router.get("/hello", (req, res) => {
  //     res.send("Hello World!");
  //   });

  app.use("/api/auth", authRountes);
  app.use("/api/metrics", metricsRoutes);
};
