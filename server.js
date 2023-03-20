const app = require("./config/express");
const mongoose = require("./config/mongoose");
const path = require("path");
require("dotenv").config();
//middlewares

// app.use(urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, "client", "build")));
const port = process.env.PORT || 8000;

mongoose.on("connected", () => {
  app.listen(port, () => {
    require("./routes/routes")(app);

    console.log("----------Metric LogoBook -----------");
    console.log(`Server app listening on port ${port}`);
  });
});
