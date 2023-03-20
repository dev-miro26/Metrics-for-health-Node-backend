const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "user",
  }
);
module.exports = mongoose.model("group", groupSchema);
