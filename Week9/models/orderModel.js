const mongoose = require('mongoose');
const { Schema } = require('mongoose')



// Create a schema

const orderProductSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    lineTotal: { type: Number },
});

const orderSchema = new mongoose.Schema({
    customerName: { type: String },
    customerEmail: { type: String },
    address: { type: String },
    products: [orderProductSchema],
    subtotal: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0.13 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

// Create a model
const Order = mongoose.model('orders', orderSchema);

// Export the model
module.exports = {
    Order,
}