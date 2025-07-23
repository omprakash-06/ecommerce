const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const orderModel = require("../models/order-model");
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
 
router.get("/order/history", async(req, res)=>{
  order = await orderModel.find({}).sort({ claimedAt: -1 });
  res.render('history',{order})
});

router.post("/order/history", async(req, res)=>{
    const { productName,quantity,totalPrice,email,_id } = req.body;
    const newOrder = await orderModel.create ({
    email,
    productName,
    quantity,
    totalPrice,
    _id,
  });

  await newOrder.save();
    res.send("order placed sucessfully");
});


module.exports = router;



