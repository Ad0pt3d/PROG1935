const express = require('express');
const router = express.Router();

// Import validators, controllers
const { orderValidators, } = require("../middleware/orderValidator");
const { getAddOrder, postAddOrder } = require("../controllers/orderController");

// Define routes
router
    .get('/', getAddOrder)
    .post('/', orderValidators, postAddOrder)
;

// Export the router
module.exports = router