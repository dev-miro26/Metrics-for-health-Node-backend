const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    contents: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    collection: "group",
  }
);
module.exports = mongoose.model("group", groupSchema);
