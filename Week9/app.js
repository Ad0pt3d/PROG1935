// Import packages
const express = require('express');

const appRouter = require("./routes/appRouter");
// Create an app
const app = express();
const port = 4040;

// Setup view engine
app.set("view engine", "ejs");

// Define routes
app.use('/', appRouter)

// Run the app
app.listen(port, () => {
    console.log(`App listening on: http://localhost:${port}`);
})