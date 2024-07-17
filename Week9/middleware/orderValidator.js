const { check, oneOf } = require('express-validator');

const orderValidators = [
    check('customerName').notEmpty().withMessage("Please enter your Name"),
    check('customerEmail').isEmail().withMessage("Please enter a valid email address"),
    check('customerPhone').matches(/^\d{3}-\d{3}-\d{4}$/),
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
    ], { message: "Please purchase atleast one product"})
    

];

module.exports = {
    orderValidators,
};