const app = require("./config/express");
const express = require("express");
const mongoose = require("./config/mongoose");
const path = require("path");

require("dotenv").config();
//middlewares

const port =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_PORT
    : process.env.DEV_API_PORT;

mongoose.on("connected", () => {
  app.listen(port, () => {
    require("./routes/routes")(app);
    console.log("----------Metric LogoBook -----------");
    console.log(`Server app listening on port ${port}`);
  });
});
