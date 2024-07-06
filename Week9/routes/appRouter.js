const express = require("express");
const router = express.Router();

const { getHome, getProfile, } = require("../controllers/appController");

// Define routes
router
    .get('/', getHome)
    .get('/profile', getProfile)
;

router.get('/json-test', (req, res) => {
    res.json({"pokemon": "Bulbasaur", "type": "Grass"})
})

// Export the router
module.exports = router