const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const wageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    metricsId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    wage: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "wage",
  }
);
module.exports = mongoose.model("wage", wageSchema);
