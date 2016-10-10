var express = require('express');
var router = express.Router();

var csrf = require('csurf');
var passport = require('passport');

var Ad = require('../models/ad');

var csrfProtection = csrf();
router.use(csrfProtection);


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'List of Ads', details: 'Ad is successfully posted!!' });
});

router.get('/add', function(req, res, next){
	var messages = req.flash('error');
	res.render('ad_add', {csrfToken: req.csrfToken(), messages: messages, hasErrors:messages.length >0});
}); 

router.post('/add', (req, res, done)=>{

	newAd = new Ad(); 
	newAd.title = req.body.title; 
	newAd.owner = req.body.owner; 
	newAd.price = req.body.price; 
	newAd.category = req.body.category; 
	newAd.desc = req.body.desc; 
	
	newAd.save(function(err, result){
		  if(err){
			console.log("ERRORRRRR"); 
			return done(err);
		  }
		  res.redirect('/dashboard'); 
		});

});

router.get('/details/:id', (req, res)=>{
	id = req.params.id; 
	var ad = Ad.find({_id:id}, function(err, ad){
		if(err){
			return next(err); 
		}
		else{
			console.log(ad); 
			res.render('details', {'ad': ad});
		}
	
	});
	
});


module.exports = router;
