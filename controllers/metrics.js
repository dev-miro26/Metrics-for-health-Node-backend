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
    const metric = await Metrics.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: true,
      }
    );
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
  try {
    const metric = await Metrics.findOne({ _id: req.query._id });
    await Wage.deleteMany({ metricsId: req.query._id });
    await Group.updateMany(
      { contents: req.query._id },
      { $pull: { contents: req.query._id } }
    );

    metric.delete();
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
