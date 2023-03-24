const path = require("path");
const express = require("express");
const authRountes = require("./auth");
const metricsRoutes = require("./metrics");
const groupRoutes = require("./group");
module.exports = (app) => {
  //   const router = express.Router();

  //   //sample route
  //   router.get("/hello", (req, res) => {
  //     res.send("Hello World!");
  //   });

  app.use("/api/auth", authRountes);
  app.use("/api/metrics", metricsRoutes);
  app.use("/api/group", groupRoutes);
  app.get("/api/*", (req, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });
  app.use(express.static(path.join(__dirname, "../client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
};
