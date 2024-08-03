const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    lineTotal: { type: Number }
});

const orderSchema = new mongoose.Schema({
    name: { type: String },
    emailAddress: { type: String, lowercase: true },
    phoneNumber: { type: String },
    address: { type: String },
    deliveryTime: { type: String },
    product: [productSchema],
    deliveryCharge: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    taxRate: { type: Number, default: 0.13 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
});

const Order = mongoose.model("models", orderSchema);


module.exports = {
    Order,
}