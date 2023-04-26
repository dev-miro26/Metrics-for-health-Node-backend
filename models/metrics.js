const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const metricsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
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
    ignore: {
      type: Boolean,
      default: true,
    },
    timing: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "metrics",
  }
);
module.exports = mongoose.model("metrics", metricsSchema);
