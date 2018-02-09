var promise = require('bluebird');
var db_info = require('../db-info');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var dbstr = 'recipe';
var connectionString = db_info.LOGIN_STR;
var db = pgp(connectionString);

module.exports.createUser = function(newUser, callback) {
	// add user to db
	console.log("accessing db");

	db.none('insert into users(email, username, password)' +
      'values(${email}, ${username}, ${password})', {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password
	}).then(function(result) {
		callback(result);
	})
	.catch(function(err) {
		callback(err);
	});
}
