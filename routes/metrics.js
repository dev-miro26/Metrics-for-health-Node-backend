const express = require("express");
const router = express.Router();
const { addMetrics, getMetrics } = require("../controllers/metrics.js");
const auth = require("../middleware/auth");

router.put("/addMetrics", auth, addMetrics);
router.get("/getMetrics", auth, getMetrics);

module.exports = router;
