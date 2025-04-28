const mongoose = require ("mongoose");

const productSchema = mongoose.Schema({
    image: Buffer,
    name:String,
    email:String,
    price:Number,
    discount:{
        type:Number,
        default:0,
    },
    fee:{
        type:Number,
        default:0,
    },
    bgcolor:String,
    panelcolor :String,
    textcolor:String,
    quantity: {
        type: Number,
        default: 1
      } 
});

module.exports = mongoose.model("product",productSchema);
