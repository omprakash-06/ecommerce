const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Shared GET view for both login and register
router.get("/register", (req, res) => {
  res.render("index", { error: req.flash("error") });
});

router.get("/login", (req, res) => {
  res.render("index", { error: req.flash("error") });
});

// POST form handlers
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;
