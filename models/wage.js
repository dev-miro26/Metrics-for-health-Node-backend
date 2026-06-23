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
// NOTE: `wage` stores a recorded metric value (e.g. weight, heart rate),
// not a salary. The field name is legacy; `value` is a read alias.
wageSchema.virtual("value").get(function () {
  return this.wage;
});

module.exports = mongoose.model("wage", wageSchema);
