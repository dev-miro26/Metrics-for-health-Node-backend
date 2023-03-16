const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
exports.register = async (req, res, next) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already exists" }] });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
exports.login = async (req, res) => {
  const { email, password } = req.body;
  // await delay(3000);
  // console.log("This printed after about 1 second");
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "The email does not exists!" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Password is incorrect!" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};

// function delay(time) {
//   return new Promise((resolve) => setTimeout(resolve, time));
// }
// @route    GET api/auth/load_user
// @desc     Get user by token
// @access   Private
exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: [{ msg: "Server error!" }] });
  }
};
