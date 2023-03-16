const express = require("express");
const router = express.Router();

const { register, login, loadUser } = require("../controllers/auth.js");
const auth = require("../middleware/auth");

router.get("/loadUser", auth, loadUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
