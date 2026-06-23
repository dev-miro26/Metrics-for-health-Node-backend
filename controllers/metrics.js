const Metrics = require("../models/metrics");
const { validationResult } = require("express-validator");
const Wage = require("../models/wage");
const Group = require("../models/group");
exports.addMetrics = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newMetrics = new Metrics({
      userId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      fieldType: req.body.fieldType,
      prefix: req.body.prefix,
      postfix: req.body.postfix,
      chartType: req.body.chartType,
      status: req.body.status,
      ignore: req.body.ignore,
      timing: req.body.timing,
    });

    const metrics = await newMetrics.save();

    res.json({ doc: metrics });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.updateMetrics = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Whitelist updatable fields to prevent mass assignment
    const allowed = [
      "name", "description", "fieldType", "prefix",
      "postfix", "chartType", "status", "ignore", "timing",
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    // Scope by userId so a user can only update their own metric (prevents IDOR)
    const metric = await Metrics.findOneAndUpdate(
      { _id: req.body._id, userId: req.user.id },
      updates,
      { new: true }
    );
    if (!metric) {
      return res.status(404).json({ errors: [{ msg: "Metric not found" }] });
    }
    res.status(200).json({ doc: metric });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.getUserMetrics = async (req, res, next) => {
  try {
    const metrics = await Metrics.find({ userId: req.user.id });
    res.json({ docs: metrics });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.deleteMetricById = async (req, res, next) => {
  const mongoose = require("mongoose");
  const session = await mongoose.startSession();
  try {
    // Scope by userId so a user can only delete their own metric (prevents IDOR)
    const owned = await Metrics.findOne({
      _id: req.query._id,
      userId: req.user.id,
    });
    if (!owned) {
      return res.status(404).json({ errors: [{ msg: "Metric not found" }] });
    }
    await session.withTransaction(async () => {
      await Wage.deleteMany({ metricsId: req.query._id }, { session });
      await Group.updateMany(
        { contents: req.query._id },
        { $pull: { contents: req.query._id } },
        { session }
      );
      await Metrics.deleteOne(
        { _id: req.query._id, userId: req.user.id },
        { session }
      );
    });
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  } finally {
    session.endSession();
  }
};
