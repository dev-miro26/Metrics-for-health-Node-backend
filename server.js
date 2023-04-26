const app = require("./config/express");
const mongoose = require("./config/mongoose");

require("dotenv").config();
//middlewares

const port = process.env.PORT;

mongoose.on("connected", () => {
  app.listen(port || 8000, () => {
    require("./routes/routes")(app);
    console.log("----------Metric LogoBook -----------");
    console.log(`Server app listening on port ${port}`);
  });
});
