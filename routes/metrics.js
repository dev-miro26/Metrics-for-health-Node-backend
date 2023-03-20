const express = require("express");
const router = express.Router();
const {
  addMetrics,
  getUserMetrics,
  deleteMetricById,
  updateMetrics,
} = require("../controllers/metrics.js");
const auth = require("../middleware/auth");

router.post("", auth, addMetrics);
router.put("", auth, updateMetrics);
router.get("", auth, getUserMetrics);
router.delete("", auth, deleteMetricById);

module.exports = router;
