require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { check, validationResult } = require('express-validator');

const { NewsletterSubscriber } = require('./models/subscriberModel');

const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log(`Connected to database!`); })
    .catch((error) => { console.log(error.message); })
;

const app = express();
const port = 4123;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');

app
    .get('/', (req, res) => {
        res.render('pages/newsletter')
    })
    .post('/', [
        check('fullName').notEmpty().withMessage("Please enter your name."),
        check('emailAddress').isEmail().withMessage("Please enter your email address.")
    ], (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('pages/newsletter', { errors: errors.array() });
        } else {
            let fullName = req.body.fullName;
            let emailAddress = req.body.emailAddress;

            const newSubscriber = new NewsletterSubscriber({
                fullName,
                emailAddress,
            });

            newSubscriber.save()
                .then(() => { console.log(`${fullName}, saved to database.`); })
                .catch((error) => { console.log(error.message); })
            ;

            res.render('pages/subscribed', { fullName });
        }
    });
;

app.listen(port, () => {
    console.log(`App on: http://localhost:${port}`);
});