const { validationResult } = require('express-validator');
const { Order } = require('../models/orderModel');

const productOnePrice = 10;
const productTwoPrice = 40;
const productThreePrice = 25;

const getAddOrder = (req, res) => {
    res.render('pages/addOrder', { productOnePrice, productTwoPrice, productThreePrice });
};

const postAddOrder = (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render("pages/addOrder", { 
            errors: errors.array(),
            productOnePrice, 
            productTwoPrice,
            productThreePrice,
        })
    } else {
        let subtotal = 0;
        let taxRate = 0;
        let tax = 0;
        let total = 0;

        let customerName = req.body.customerName
        let customerEmail = req.body.customerEmail
        let province = req.body.province;
        let productOneQty = parseInt(req.body.productOneQty) || 0;
        let productTwoQty = parseInt(req.body.productTwoQty) || 0;
        let productThreeQty = parseInt(req.body.productThreeQty) || 0;

        let productOneLineTotal = productOneQty * productOnePrice;
        let productTwoLineTotal = productTwoQty * productTwoPrice;
        let productThreeLineTotal = productThreeQty * productThreePrice;

        switch (province) {
            case "ON":
                taxRate = 0.13;
                break;
            default:
                taxRate = 0.13;
                break;
        }

        subtotal = productOneLineTotal + productTwoLineTotal + productThreeLineTotal;
        tax = subtotal * taxRate;
        total = subtotal + tax;

        let data = {
            customerName,
            customerEmail,
            address: `123 Maple Street, ${province}`,
            products: [
                {
                    name: "Product 1",
                    price: productOnePrice,
                    quantity: productOneQty,
                    lineTotal: productOneLineTotal,
                },
                {
                    name: "Product 2",
                    price: productTwoPrice,
                    quantity: productTwoQty,
                    lineTotal: productTwoLineTotal,
                },
                {
                    name: "Product 3",
                    price: productThreePrice,
                    quantity: productThreeQty,
                    lineTotal: productThreeLineTotal,
                },
            ],
            subtotal,
            taxRate,
            tax,
            total,
        }

        let newOrder = new Order({
            customerName,
            customerEmail,
            address: `${province}`,
            products: [
                {
                    name: "Product 1",
                    price: productOnePrice,
                    quantity: productOneQty,
                    lineTotal: productOneLineTotal,
                },
                {
                    name: "Product 2",
                    price: productTwoPrice,
                    quantity: productTwoQty,
                    lineTotal: productTwoLineTotal,
                },
                {
                    name: "Product 3",
                    price: productThreePrice,
                    quantity: productThreeQty,
                    lineTotal: productThreeLineTotal,
                },
            ],
            subtotal,
            taxRate,
            tax,
            total
        });
        
        newOrder.save()
            .then(() => { console.log(`${customerName}'s Order Saved!`); })
            .catch((error) => { console.log(error.message); })

        res.render("pages/reciept", data);
    }


};

const getAllOrders = async (req, res) => {
    let orders = await Order.find({}).exec();
    res.render("pages/orders", { orders });
};

const getOneOrder = async (req, res) => {
    let order = await Order.findById(req.params.orderId).exec();
    res.render("pages/reciept", order);
};

const getDeleteOneOrder = async (req, res) => {
    await Order.findByIdAndDelete(req.params.orderId).exec();
    res.redirect("/orders");
}

module.exports = {
    getAddOrder,
    postAddOrder,
    getAllOrders,
    getOneOrder,
    getDeleteOneOrder,
};