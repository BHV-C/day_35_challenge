// Step 1: Set up the project
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const app = express();
const route = require('./routes/route');
const port = 3000;
const connectDB = require('./databases/db'); // Import the database connection function
require('dotenv').config();


// Connect to the database
connectDB();

app.set('view engine', 'ejs');
app.set("views", __dirname + '/views');


app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json())



// Step 2: Configure Passport.js

// Configure session management
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configure serialization and deserialization of user data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Step 3: Create Login Routes

const User = require('./databases/models/User');


app.use(route);


// Step 4: Implement Local Authentication Strategy
// const { username, password } = req.body;
// passport.use(new LocalStrategy(
//   // {
//   // usernameField: 'email',
//   // passwordField: 'password'
// //   username,password
// // }, 
// (username, password, done) => {
//   User.findOne({ username }, (err, user) => {
//     if (err) return done(err);
//     if (!user) return done(null, false);

//     // Compare the provided password with the stored user password
//     user.comparePassword(password, (err, isMatch) => {
//       if (err) return done(err);
//       if (!isMatch) return done(null, false);

//       return done(null, user);
//     });
//   });
// }));

// Step 5: Protect Routes



// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

