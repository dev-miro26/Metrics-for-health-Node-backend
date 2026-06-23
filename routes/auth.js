const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { register, login, loadUser } = require("../controllers/auth.js");
const auth = require("../middleware/auth");

router.get("/loadUser", auth, loadUser); // load user
router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "A valid email is required").isEmail(),
    check("password", "Password must be at least 8 characters").isLength({ min: 8 }),
  ],
  register
);
router.post(
  "/login",
  [
    check("email", "A valid email is required").isEmail(),
    check("password", "Password is required").notEmpty(),
  ],
  login
);

module.exports = router;
