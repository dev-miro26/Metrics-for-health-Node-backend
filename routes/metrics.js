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

router.post("", auth, addMetrics);
router.put("", auth, updateMetrics);
router.get("", auth, getUserMetrics);
router.delete("", auth, deleteMetricById);
router.post("/wage", auth, addMetricsWage);
router.put("/wage", auth, updateMetricsWage);
router.get("/wage", auth, getUserMetricsAllWages);
router.get("/wage/today", auth, getUserMetricsAllTodayWages);
router.delete("/wage", auth, deleteMetricWageById);
router.get("/wage/lastest", auth, getLastestMetricsWagesById);

module.exports = router;
