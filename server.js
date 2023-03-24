const app = require("./config/express");
const express = require("express");
const mongoose = require("./config/mongoose");
const path = require("path");

require("dotenv").config();
//middlewares

const port = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose.on("connected", () => {
  app.listen(port, () => {
    require("./routes/routes")(app);

    console.log("----------Metric LogoBook -----------");
    console.log(`Server app listening on port ${port}`);
  });
});
