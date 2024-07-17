const { validationResult } = require('express-validator');

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

        res.render("pages/reciept", data);
    }


};

module.exports = {
    getAddOrder,
    postAddOrder
};