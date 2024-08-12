const { body, check, oneOf } = require("express-validator");
const { Login } = require("../models/loginModel");

// TODO: Add Login validators
const loginValidators = [
    check("username").notEmpty().withMessage("Please enter your username"),
    check("password").notEmpty().withMessage("Please enter your password"),
    body("username").custom(async (username, { req }) => {
        let password = req.body.password;
        
        let user = await Login.findOne({ username, password }).exec();

        if (!user) {
            throw new Error("Invalid credentials!");
        }
    })
];

// TODO: Add Form validators
const formValidators = [
    check("customerName").notEmpty().withMessage("Please enter your name"),
    check("phoneNumber").matches(/^\d{3}-\d{3}-\d{4}$/),
    check("mangoJuiceQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Mango Juice should have a positve number"),
    check("berryJuiceQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Berry Juice should have a positve number"),
    check("appleJuiceQuantity")
        .optional({ values: "falsy" })
        .matches(/^[1-9]\d*$/)
        .withMessage("Apple Juice should have a positve number"),
    oneOf([
        check("mangoJuiceQuantity").notEmpty(),
        check("berryJuiceQuantity").notEmpty()
    ], { message: "Please purchase atleast one product"})
];

module.exports = {
    loginValidators,
    formValidators
};
