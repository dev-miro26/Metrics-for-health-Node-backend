const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRountes = require("./routes/auth.js");
const metricsRountes = require("./routes/metrics.js");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// mongoose.createConnection(
//   "mongodb+srv://kateryna:monster@1992@cluster0.ivsvnno.mongodb.net/metrics_book?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );
// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

//middlewares
app.use(bodyParser.json());
app.use(cors());
// app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/auth", authRountes);
app.use("/api/metrics", metricsRountes);

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (_req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server app listening on port ${port}`);
});
