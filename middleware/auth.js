const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header

  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ errors: [{ msg: "Token is not valid" }] });
      } else {
        const user = await User.findOne({ _id: decoded.user.id });
        console.log(user);

        if (user?._id) {
          req.user = decoded.user;
          next();
        } else {
          return res
            .status(401)
            .json({ errors: [{ msg: "Token is not valid" }] });
        }
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};
