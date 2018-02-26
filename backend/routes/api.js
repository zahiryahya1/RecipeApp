var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Ingredients = require('../models/ingredients');

var db_info = require('../db-info');


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// login
router.get('/', function(req, res) {

	res.send('api homepage');
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/api/',failureFlash: true}),
  function(req, res) {
    res.send('Log in successful!');
  });

router.get('/data', ensureAuthenticated, function(req, res) {
	res.send("user is authenticated");
});


router.post('/register', function(req, res) {

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.paaaword2;

    // validation
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Emial is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Please re-enter password').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


    var errors = req.validationErrors();

    if (errors) {
    	var result = {
    		"status": "failed",
    		"message": "One of the fields was incorrect.",
    		"errors": errors
    	};

        res.send(result);
    }
    else {
        var newUser = {
            email: email,
            username: username,
            password: password,
        };

        User.createUser(newUser, function(err) {
            if (!err) {
                var result = {
                    "status": "success",
                    "message": "Account was registered."
                }

                res.send(result);
            }
            else {
                var result = {
                    "status": "fail",
                    "message": "Account was not registered. Email already has an account linked to it."
                }

                res.send(result);
            }
        });
    }
});

router.get('/ingredients', ensureAuthenticated, function(req, res) {
	Ingredients.getIngredients(function(data, errFlag) {
		if (errFlag) {
			result = {
				error: true,
				msg: data,
			};
			res.send(result);
		}
		result = {
			error: false,
			ingredients: data
		};
		
		res.send(data);
	});
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
