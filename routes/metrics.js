const express = require("express");
const router = express.Router();
const {
  addMetrics,
  getUserMetrics,
  deleteMetricById,
  updateMetrics,
} = require("../controllers/metrics.js");
const {
  addMetricsWage,
  updateMetricsWage,
  getUserMetricsAllWages,
  getUserMetricsAllTodayWages,
  deleteMetricWageById,
  getLastestMetricsWagesById,
} = require("../controllers/wage.js");
const auth = require("../middleware/auth");
const validateIdParam = require("../middleware/validateIdParam");

router.post("/", auth, addMetrics);
router.put("/", auth, validateIdParam, updateMetrics);
router.get("/", auth, getUserMetrics);
router.delete("/", auth, validateIdParam, deleteMetricById);
router.post("/wage", auth, addMetricsWage);
router.put("/wage", auth, updateMetricsWage);
router.get("/wage", auth, getUserMetricsAllWages);
router.get("/wage/today", auth, getUserMetricsAllTodayWages);
router.delete("/wage", auth, validateIdParam, deleteMetricWageById);
router.get("/wage/lastest", auth, getLastestMetricsWagesById);

module.exports = router;
