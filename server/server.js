const express = require('express');
const app = express();
const path = require('path');
let port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const handler = require('./request-handler');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();
const fs = require('fs');

const User = require('../db/models/user');
const Product = require('../db/models/product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// authentication using passport local
app.use(session({
  secret: 'not so secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));
// authentication using passport google
// http://localhost:3000/
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
  // console.log('profileemails', profile.emails);
  User.findOne({ 'username': profile.emails[0].value }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    } else {
      let obj = { 'My WishList': [] };
      var newUser = new User();
      // newUser.google.username = profile.emails[0].value;
      newUser.username = profile.emails[0].value;
      newUser.shoppingList = obj;
      passport.serializeUser(function(user, done) {
        done(null, user._id);
      });
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
      newUser.save(function(err) {
        if (err) {
          console.log(err);
        }
        return done(null, newUser);
      });
    }
  });
}
));

// This is supposed to prevent CORS errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
});

var smtTransport = nodemailer.createTransport({
  service: 'gmail',
  host: 'beretsberet@gmail.com',
  auth: ({
    user: 'beretsberet@gmail.com',
    pass: 'dummy123'
  })
});

var mailOptions = {
  from: 'Admin <beretsberet@gmail.com',
  to: 'bois.bb18@gmail.com',
  subject: 'Hello World!',
  text: 'Hello World!'
};

app.listen(port, (req, res) => {
  console.log('listening on port ', port);
});

app.get('/message', (req, res) => {
  smtTransport.sendMail(mailOptions, (err, response) => {
    if (err) { throw err; }
    res.status(200);
  });
});

// handle product information in db
app.get('/update', handler.updateProducts);
app.post('/save', handler.saveShopping);
app.post('/save-existing', handler.saveExisting);
app.post('/create-list', handler.createList);
app.put('/remove-list', handler.removeList);
app.put('/rename-list', handler.renameList);

// handle data fetch from Walmart API
app.get('/lookupItem', handler.cachedProductDetails);
app.get('/feature', handler.cachedWishlist);
app.get('/search', handler.search);
app.get('/trending', handler.getTrending);
app.get('/myLists', handler.retrieveShopping);
app.get('/zipcodes', handler.getStores);

// handle user authentication
app.post('/signup', handler.signUpUser);
app.post('/login', handler.logInUser);
app.get('/logout', handler.logOutUser);

app.get('/auth/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/userinfo.email']})
);
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login'}),
  function(req, res) {
    res.redirect('/loggedIn/User');
  }
);

app.get('/loggedIn/*', function(req, res) {
  fs.readFile(path.join(__dirname, '../public/index.html'), 'utf8', function(err, data) {
    if (err) {
      // res.Content-Type: 'application/html'
      res.status(500).end('err');
      console.log(err);
    } else {
      res.status(200).send(data);
    }

  });
});

//handles sending Email
app.post('/sendlist', handler.sendList);
