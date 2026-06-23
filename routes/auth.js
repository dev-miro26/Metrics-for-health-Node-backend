const express = require("express");
const router = express.Router();

const { register, login, loadUser } = require("../controllers/auth.js");
const auth = require("../middleware/auth");
const authLimiter = require("../middleware/rateLimiter");

router.get("/loadUser", auth, loadUser); // load user
router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
