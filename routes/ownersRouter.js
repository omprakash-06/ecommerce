const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    try {
      // Check if there are already owners
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res
          .status(403)
          .send("You don't have permission to create a new owner.");
      }

      // Destructure the fields from the request body
      const { fullname, email, password } = req.body;

      // Validation
      if (!fullname || !email || !password) {
        return res.status(400).send("All fields are required.");
      }

      // Create the new owner
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
      });

      res.status(201).json({ message: "Owner created successfully", createdOwner });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
}

router.get("/admin", function (req, res) {
  res.render("createproducts",{user:req.user}); // Render the product creation page
});

module.exports = router;



