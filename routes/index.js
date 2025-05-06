const express = require("express");
const router = express.Router();
const productModel = require("../models/product-model");
const isLoggedin = require("../middleware/isLoggedin");
const userModel = require("../models/user-model");

// Homepage: Register/Login page
router.get("/", (req, res) => {
    res.render('index', {
        user: req.user,
        success: req.flash("success"),
        error: req.flash("error")
    });
});

// Shop page
router.get("/shop", isLoggedin, async (req, res) => {
    let products = await productModel.find();
    res.render("shop", {
        products,
        user: req.user,
        success: req.flash("success"),
        error: req.flash("error")
    });
});

// Add to cart
router.get("/addtocart/:id", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        
        // Prevent duplicates (optional)
        if (!user.cart.includes(req.params.id)) {
            user.cart.push(req.params.id);
            await user.save();
            req.flash('success', 'Product added to your cart!');
        } else {
            req.flash('success', 'Product is already in your cart!');
        }

        res.redirect("/shop");
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong!');
        res.redirect("/shop");
    }
});
// view cart
router.get("/cart", isLoggedin, async (req, res) => {
   let user = await userModel.findOne({ email: req.user.email }).populate("cart");
   res.render("cart",{user:req.user,user});
});

//increase product quantity
router.get("/cart/increase/:id", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    let product = user.cart.find((element) => element._id.toString() === req.params.id);
    if(product){
        product.quantity += 1 ;
        await product.save(); // Save the updated quantity
    }
    res.redirect("/cart");
 });

 //decrease product quantity
router.get("/cart/decrease/:id", isLoggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    let product = user.cart.find((element) => element._id.toString() === req.params.id);
    if(product){
        
        product.quantity = product.quantity > 1 ? product.quantity - 1 : 1;
        await product.save(); // Save the updated quantity
    }
    res.redirect("/cart");
 });
module.exports = router;
