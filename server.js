const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRountes = require("./routes/auth.js");
const metricsRountes = require("./routes/metrics.js");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

//middlewares
app.use(bodyParser.json());
app.use(cors());
// app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/auth", authRountes);
app.use("/api/metrics", metricsRountes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
