// Import packages
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { check, validationResult } = require('express-validator');

const { BlogSubscriber } = require('./models/subscriberModel')

// Connect to the database
const uri = process.env.MONGODB_CONNECTION_STRING
mongoose.connect(uri)
    .then(() => { console.log(`Connected to database!`); })
    .catch((error) => { console.log(error.message); })
;

// Create an app
const app = express();
const port = 3004;

// Setup body parser,
app.use(express.urlencoded({ extended: false })); // Body parser
app.set('view engine', 'ejs'); // ejs template

// Define routes
app
    .get('/', (req, res) => {
        res.render('newsletter');
    })
    .post('/', [
        check('fullName').notEmpty().withMessage("Please enter your name"),
        check('emailAddress').isEmail().withMessage("Please enter a valid email address")
    ], (req, res) => {
        let errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.render('newsletter', { errors: errors.array() });
        } else {
            let fullName = req.body.fullName;
            let emailAddress = req.body.emailAddress;

        // Create an instance
        const newSubscriber = new BlogSubscriber({
            fullName,
            emailAddress,
        });

        newSubscriber.save()
            .then(() => { console.log(`${fullName}, Saved!`); })
            .catch((error) => { console.log(error.messsage); })
        ;

            res.render('thankyou', { fullName });
        }
    });
;

app.listen(port, () => {
    console.log(`App on: http://localhost:${port}`)
})