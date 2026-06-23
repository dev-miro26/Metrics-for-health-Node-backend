const rateLimit = require("express-rate-limit");

// Strict limiter for authentication endpoints to slow brute-force attacks.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { errors: [{ msg: "Too many attempts, please try again later." }] },
});

module.exports = authLimiter;
