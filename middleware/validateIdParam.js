const mongoose = require("mongoose");

// Validates an _id supplied via query or body before it reaches a Mongo query.
const validateIdParam = (req, res, next) => {
  const id = req.query._id || req.body._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ errors: [{ msg: "Invalid ID" }] });
  }
  next();
};

module.exports = validateIdParam;
