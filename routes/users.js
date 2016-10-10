var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var passport = require('passport');

var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next){
  res.render('profile');
});

router.use('/home', notLoggedIn, function(req, res, next){
  next();
})

router.get('/home', function(req, res, next) {
  res.render('home', {title:'Home'});
});

/*Signup page*/
router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
  res.render('signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length >0});
});

router.post('/signup', passport.authenticate('local.signup',{
  successRedirect: 'profile',
  failureRedirect: 'signup',
  failureFlash: true

}));

router.get('/signin', function(req, res, next){
  var messages = req.flash('error');
  res.render('signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length >0});
});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: 'profile',
  failureRedirect: 'signin',
  failureFlash: true

}));

router.get('/logout', function(req, res, next){
  req.logout();
  res.redirect('/');
})

router.get('/users', function(req, res, next){
User.find(function(err,users){
  if(err){
    console.log("Unable to connect to User's collection");
  }
  else if(users.length){
    res.render('users', {'users': users});
    }
  else{
    console.log("No users found");
  }
});
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/home');
}

function notLoggedIn(req, res, next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
