const { validationResult } = require('express-validator');
const { Order } = require('../models/orderModel');

const productOnePrice = 10;
const productTwoPrice = 40;
const productThreePrice = 25;

let deliveryCharge = 0;
let deliveryTimeReadable = "";

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

        let customerName = req.body.customerName;
        let customerEmail = req.body.customerEmail;
        let customerPhone = req.body.customerPhone;
        
        let customerAddress = req.body.customerAddress;
        let customerCity = req.body.customerCity;
        let customerProvince = req.body.customerProvince;
        let customerPostalCode = req.body.customerPostalCode;

        let deliveryTime = req.body.deliveryTime;

        let productOneQty = parseInt(req.body.productOneQty) || 0;
        let productTwoQty = parseInt(req.body.productTwoQty) || 0;
        let productThreeQty = parseInt(req.body.productThreeQty) || 0;

        let productOneLineTotal = productOneQty * productOnePrice;
        let productTwoLineTotal = productTwoQty * productTwoPrice;
        let productThreeLineTotal = productThreeQty * productThreePrice;

        switch (customerProvince) {
            case "AB":
            case "NT":
            case "NV":
            case "YT":
                taxRate = 0.05;
                break
            case "NB":
            case "NL":
            case "NS":
            case "PE":
                taxRate = 0.15;
                break
            case "MB":
            case "BC":
                taxRate = 0.12;
                break;
            case "ON":
                taxRate = 0.13;
                break;
            case "QC":
                taxRate = 0.14975;
                break;
            case "SK":
                taxRate = 0.11;
                break;
            default:
                taxRate = 0.13;
                break;
        }
        
        switch (deliveryTime) {
            case "threeDays":
                deliveryCharge = 20;
                deliveryTimeReadable = "3 Days";
                break;
            case "fiveDays":
                deliveryCharge = 10;
                deliveryTimeReadable = "5 Days"
                break;
            case "sevenDays":
                deliveryCharge = 5;
                deliveryTimeReadable = "7 Days"
                break;
            case "tenDays":
                deliveryCharge = 0;
                deliveryTimeReadable = "10 Days"
                break;
            default:
                deliveryCharge = 0;
                deliveryTimeReadable = "11+ Days"
                break;
        }
        
        subtotal = productOneLineTotal + productTwoLineTotal + productThreeLineTotal + deliveryCharge;
        tax = subtotal * taxRate;
        total = subtotal + tax;

        let data = {
            customerName,
            customerEmail,
            customerPhone,
            address: `${customerAddress}, ${customerCity}, ${customerProvince}, ${customerPostalCode}`,
            deliveryTimeReadable,
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
            deliveryCharge,
            subtotal,
            taxRate,
            tax,
            total,
        }

        let newOrder = Order({
            name: `${customerName}`,
            emailAddress: `${customerEmail}`,
            phoneNumber: `${customerPhone}`,
            address: `${customerAddress}, ${customerCity}, ${customerProvince}, ${customerPostalCode}`,
            deliveryTime: `${deliveryTimeReadable}`,
            product: [
                {
                    name: "Product 1",
                    price: productOnePrice,
                    quantity: productOneQty,
                    lineTotal: productOneLineTotal
                },
                {
                    name: "Product 2",
                    price: productTwoPrice,
                    quantity: productTwoQty,
                    lineTotal: productTwoLineTotal
                },
                {
                    name: "Product 3",
                    price: productThreePrice,
                    quantity: productThreeQty,
                    lineTotal: productThreeLineTotal
                }],
            deliveryCharge,
            subtotal,
            taxRate,
            tax,
            total
        })

        newOrder.save()
            .then(() => { console.log(`${customerName}, Saved to database!`)})
            .catch((error) => { console.log(error.message); })
        ;

        res.render("pages/reciept", data);
    }
};

module.exports = {
    getAddOrder,
    postAddOrder
};