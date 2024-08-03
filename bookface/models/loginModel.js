const { Schema, model } = require('mongoose');

const loginSchema = new Schema({
    "username": { type: String, unique: true },
    "password": { type: String },
})

const Login = model("users", loginSchema);

module.exports = {
    Login
};