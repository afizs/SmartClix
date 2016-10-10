var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  function(req, username, password, done){
    // get the data from callback
    var name = req.body.name;
    var email = req.body.email;
    var role = req.body.role;
    // validate data
    req.checkBody('name', 'Invalid name').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('role', 'Invalid role').notEmpty();
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    // get errors
    var errors = req.validationErrors();
    if(errors){
      var messages =[];
      errors.forEach(function(error){
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email':req.body.email}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false, {message:"email is already registered"});
      }
    });

    User.findOne({'username':username}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false, {message:"username is already taken"});
      }
    });
    newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    newUser.role = req.body.role;
    // console.log(newUser.name);
    // console.log(newUser.username);
    // console.log(newUser.email);
    // console.log(newUser.password);

    newUser.save(function(err, result){
      if(err){
        return done(err);
      }
      return done(null, newUser);
    });
}));

// signin strategy
passport.use('local.signin', new LocalStrategy({usernameField: 'username',
passwordField: 'password',
passReqToCallback: true
},
function(req, username, password, done){
  req.checkBody('username', 'Invalid username').notEmpty();
  req.checkBody('password', 'Invalid password').notEmpty();
  // get errors
  var errors = req.validationErrors();
  if(errors){
    var messages =[];
    errors.forEach(function(error){
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'username':username}, function(err, user){
    if(err){
      return done(err);
    }
    if(!user){
      return done(null, false, {message:"username is not found"});
      }
    if(!user.validPassword(password)){
      return done(null, false, {message:'password is wrong'});
    }
    return done(null, user);
  });
})); 
