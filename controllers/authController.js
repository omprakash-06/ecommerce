const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "You already have an account. Please log in.");
      return res.redirect("/users/register");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/users/login");
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Something went wrong. Please try again.");
    return res.redirect("/users/register");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Email or password is incorrect.");
      return res.redirect("/users/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Email or password is incorrect.");
      return res.redirect("/users/login");
    }

    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    return res.redirect("/shop"); // or wherever you want
  } catch (err) {
    console.error(err.message);
    req.flash("error", "Login failed. Try again.");
    return res.redirect("/users/login");
  }
};

