require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');

const appRouter = require('./routes/appRouter');

const uri = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(uri)
    .then(() => { console.log(`Connected to database!`); })
    .catch((error) => { console.log(error.message); })
;

const app = express();
const port = 4444;

app.use(session({
    secret: "24-S2-bookface",
    resave: false,
    saveUninitialized: true
}))

app.use(express.static('public'));
app.use(express.urlencoded({ extended:false }));
app.set('view engine', 'ejs');

app.use('/', appRouter);

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
});