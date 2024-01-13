// Import required modules
const express = require('express');
const app = express();
const port = 8000;

// Connect to MongoDB using Mongoose
const db = require('./config/mongoose');

// Set up EJS layouts middleware
const expressEjsLayouts = require('express-ejs-layouts');
app.use(expressEjsLayouts);

// Set up routes
app.use('/', require('./routes'));

// Uncomment the following block if you want a simple response at the root path
// app.get('/', (req, res) => {
//     res.send("<h1>Hello</h1>");
// });

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Set the default layout for your views
app.set('layout', 'layout');

// Enable extraction of styles and scripts from the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Start the server and listen on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});
