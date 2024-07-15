const express = require("express");
const router = express.Router();

const { getProfile } = require("../controllers/profieController");

router
    .get('/', getProfile)
;

module.exports = router