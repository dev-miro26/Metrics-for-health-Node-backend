const mongoose = require("mongoose");
const Metrics = require("./metrics");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);

// userSchema.pre("save", async function (next) {
//   try {
//     // Create new profile with predefined fields

//     const newOtherDocs = [
//       {
//         userId: this._id,
//         chartType: "line",
//         description: "",
//         fieldType: "number",
//         name: "Mood",
//         order: "",
//         postfix: "",
//         prefix: "",
//         status: "active",
//         timing: "daily",
//       },
//       {
//         userId: this._id,
//         chartType: "line",
//         description: "",
//         fieldType: "number",
//         name: "Heart rate",
//         order: "",
//         postfix: "",
//         prefix: "",
//         status: "active",
//         timing: "daily",
//       },
//       {
//         userId: this._id,
//         chartType: "line",
//         description: "",
//         fieldType: "number",
//         name: "Weight",
//         order: "",
//         postfix: "",
//         prefix: "",
//         status: "active",
//         timing: "daily",
//       },
//     ];

//     // Save new profile
//     await Metrics.insertMany(newOtherDocs);

//     next();
//   } catch (err) {
//     console.error(err.message);
//     next(err);
//   }
// });
module.exports = mongoose.model("user", userSchema);
