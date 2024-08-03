const { check, body } = require('express-validator');
const { Login } = require('../models/loginModel')

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

module.exports = {
    loginValidators,
};