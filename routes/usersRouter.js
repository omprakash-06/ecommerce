const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Shared GET view for both login and register
router.get("/register", (req, res) => {
  res.render("index", { error: req.flash("error") });
});

router.get("/login", (req, res) => {
  res.render("index", { error: req.flash("error"),user:req.user, success: req.flash("success"), });
});

router.get('/logout', (req, res) => {

  res.clearCookie('token'); 

  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send("Could not log out, please try again.");
      }

      res.redirect('/');
  });
});

// POST form handlers
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);



module.exports = router;
