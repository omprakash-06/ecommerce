const express = require("express");
const router = express.Router();
const isLoggedin = require("../middleware/isLoggedin");
const productModel = require("../models/product-model");

router.get("/",(req,res)=>{
    res.render('index', {
        messages: {
            success: req.flash('success'),
            error: req.flash('error')
        }
    });
    
})

router.get("/shop",isLoggedin,async(req,res)=>{ 
    let products = await productModel.find();
    res.render("shop",{products});
})

module.exports = router;