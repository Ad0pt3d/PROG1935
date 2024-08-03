const express = require('express');
const router = express.Router();

// Import controllers and validators
const { loginValidators } = require('../middleware/validators');
const { getLogin, postLogin, getLogout } = require('../controller/loginController');
const { getHome, getSecret } = require('../controller/homeController');

router
    .get('/login', getLogin)
    .post('/login', loginValidators, postLogin)
    .get('/logout', getLogout)
    .get('/', getHome)
    .get('/secret', getSecret)
;

module.exports = router;