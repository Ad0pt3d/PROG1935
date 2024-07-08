const express = require("express");
const router = express.Router();

const { getAddOrder, postAddOrder } = require("../controllers/orderController");

// Define routes
router
    .get('/', getAddOrder)
    .post('/', postAddOrder)
;

// Export the router
module.exports = router