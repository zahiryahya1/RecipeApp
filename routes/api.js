var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// login
router.get('/', function(req, res) {
	res.send('api homepage');
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/',failureFlash: true}),
  function(req, res) {
    res.send('Log in successful!');
  });

router.get('/data', ensureAuthenticated, function(req, res) {
	res.send("user is authenticated");
});


function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	else {
		//req.flash('error_msg', 'You are not logged in');
		var result = {
			"authentication:": "not logged in"
		}

		res.send(result);
	}
}


module.exports = router;
