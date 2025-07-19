const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type:String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
