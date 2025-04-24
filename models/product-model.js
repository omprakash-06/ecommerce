const mongoose = require ("mongoose");

const productSchema = mongoose.Schema({
    image: String,
    name:String,
    email:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    
    bgcolor:String,
    penelcolor :String,
    textcolor:String, 
});

module.exports = mongoose.model("product",productSchema);
