// Import required modules
const express = require('express');
const app = express();
const port = 8000;

// const mongoose = require('./config/mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const connectFlash = require('connect-flash');

const User = require('./model/user');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// Set up sessions and flash
app.use(expressSession({
    secret: 'secret', // Use a secure secret key in production
    resave: false,
    saveUninitialized: true
}));
app.use(connectFlash());

// Set up EJS layouts middleware
app.use(expressEjsLayouts);

app.use(express.static('./assets'));

app.use(cookieParser());


// reading the post request 
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use('/', require('./routes'));

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
