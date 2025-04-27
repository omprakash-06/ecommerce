const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const { name } = require("ejs");

router.post("/create", upload.single('image'), async (req, res) => {
    try {
        let { name, email, price, discount, bgcolor, panelcolor, textcolor } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            email,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        req.flash("success", "Product created successfully!");
        res.redirect("/");
    } catch (error) {
        console.error(error);
        // Check if the error is related to Multer's file filter
        if (error instanceof multer.MulterError) {
            return res.status(400).send("Invalid file type. Please upload an image.");
        }
        res.status(500).send("Server Error");
    }
});

module.exports = router;