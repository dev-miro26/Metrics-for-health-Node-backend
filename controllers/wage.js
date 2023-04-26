const Wage = require("../models/wage");
const { check, validationResult } = require("express-validator");

(exports.addMetricsWage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newWage = new Wage({
      userId: req.user.id,
      metricsId: req.body.metricId,
      wage: req.body.metricValue,
    });

    const wage = await newWage.save();

    res.json({ doc: wage });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
}),
  (exports.updateMetricsWage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const wage = await Wage.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
      );

      res.status(200).json({ doc: wage });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: "Server error!" }] });
    }
  });
exports.getUserMetricsAllWages = async (req, res) => {
  try {
    const wages = await Wage.find({ userId: req.user.id });
    res.json({ docs: wages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
exports.getUserMetricsAllTodayWages = async (req, res) => {
  const today = new Date();
  try {
    const wages = await Wage.find({ userId: req?.user?.id });

    const results = wages.filter(
      (wage) =>
        parseInt(new Date(wage.createdAt).getFullYear()) ===
          parseInt(today.getFullYear()) &&
        parseInt(new Date(wage.createdAt).getMonth()) ===
          parseInt(today.getMonth()) &&
        parseInt(new Date(wage.createdAt).getDate()) ===
          parseInt(today.getDate())
    );
    res.json({ docs: results });
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
exports.getLastestMetricsWagesById = async (req, res) => {
  try {
    const wages = await Wage.find({ userId: req.user.id })
      .sort({
        createdAt: -1,
      })
      .limit(3);
    res.status(200).json({ docs: wages });
  } catch (err) {
    // console.error(err.message);
    // res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
exports.deleteMetricWageById = async (req, res) => {
  try {
    const wage = await Wage.findOne({ _id: req.query._id });
    wage.delete();
    res.status(200).json();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
