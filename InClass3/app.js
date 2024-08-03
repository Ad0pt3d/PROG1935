// Import packages
const express = require('express');

const appRouter = require('./routes/appRouter')

const app = express();
const port = 5500;

app.use(express.static('public'));
app.set("view engine", "ejs");

app.use('/', appRouter);

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`)
});