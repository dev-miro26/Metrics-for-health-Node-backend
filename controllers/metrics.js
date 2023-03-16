const Metrics = require("../models/metrics");
const { check, validationResult } = require("express-validator");

exports.addMetrics = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newMetrics = new Metrics({
      user: req.user.id,
      name: req.body.name,
      description: req.body.description,
      fieldType: req.body.fieldType,
      prefix: req.body.prefix,
      postfix: req.body.postfix,
      chartType: req.body.chartType,
      status: req.body.status,
      order: req.body.order,
      timing: req.body.timing,
    });

    const metrics = await newMetrics.save();

    res.json(metrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

exports.getMetrics = async (req, res, next) => {
  try {
    const metrics = await Metrics.find({ user: req.user.id });
    res.json(metrics);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
