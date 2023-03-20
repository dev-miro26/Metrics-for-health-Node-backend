const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let metricsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    fieldType: {
      type: String,
    },
    prefix: {
      type: String,
    },
    postfix: {
      type: String,
    },
    chartType: {
      type: String,
    },
    status: {
      type: String,
    },
    order: {
      type: String,
    },
    timing: {
      type: String,
    },
    group: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    collection: "metrics",
  }
);
module.exports = mongoose.model("metrics", metricsSchema);
