var express = require('express');
var router = express.Router();


var Ad = require('../models/ad');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});

/*
dashboard to display available ads
*/
router.get('/dashboard',function(req, res, next) {
  Ad.find(function(err, ads){
    if(err){
          console.log("Unable to connect to collection");
        }
        else if(ads.length){
          res.render('dashboard', {'ads':ads});
          console.log(ads);
        }
        else {
          console.log("No documents found");
        }
  })

});

module.exports = router;
