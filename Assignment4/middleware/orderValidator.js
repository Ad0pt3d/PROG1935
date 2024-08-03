const { check, oneOf } = require('express-validator');

const orderValidators = [
    check('customerName').notEmpty().withMessage("Please enter your name"),
    check('customerEmail').isEmail().withMessage("Please enter a valid email address"),
    check('customerPhone').matches(/^\d{3}-\d{3}-\d{4}$/).withMessage("Please enter your phone number"),
    check('customerAddress').notEmpty().withMessage("Please enter your address"),
    check('customerCity').notEmpty().withMessage("Please enter your city"),
    check('customerPostalCode').matches(/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/).withMessage("Please enter your postal code"),
    check('productOneQty')
        .optional({values: "falsy"})
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 1 quantity should be a positive number"),
    check('productTwoQty')
        .optional({values: "falsy"})
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 2 quantity should be a positive number"),
    check('productThreeQty')
        .optional({values: "falsy"})
        .matches(/^[1-9]\d*$/)
        .withMessage("Product 3 quantity should be a positive number"),
    oneOf([
        check('productOneQty').notEmpty(),
        check('productTwoQty').notEmpty(),
        check('productThreeQty').notEmpty(),
    ], { message: "Please purchase atleast one product"})
    

];

module.exports = {
    orderValidators,
};