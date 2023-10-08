const express = require('express');
const route = express.Router();
const User = require('../databases/models/User');
const app = express();

const passport = require('passport');


route.get('/', (req, res) => {
    res.send('welcome to my basic server');
});

// User registration route
route.get('/register', (req, res) => {
    res.render('registration');
})

route.post('/register', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    
    // Create a new user record and hash the password
    const newUser = new User({ username, password });
    await newUser.save();
    
    res.redirect('/login');
});

// User login route
route.get('/login', (req, res) => {
    res.render('login');
})

route.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
}));

// User logout route
route.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
// Step 5: Protect Routes

// Example protected route
route.get('/dashboard', isAuthenticated, (req, res) => {
    // Only accessible to authenticated users
    res.render('dashboard');
  });
  


// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
module.exports = route;