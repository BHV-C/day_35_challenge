const express = require('express');
const passport = require('passport');
const session = require('express-session');
const port = 3000;
const app = express();

// Initialize session middleware
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Include your Passport configuration (passport-config.js)
require('./passport-config')(passport);

// Define your routes and implement authentication logic
// ...

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
