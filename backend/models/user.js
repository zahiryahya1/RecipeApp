var promise = require('bluebird');
var db_info = require('../db-info');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = db_info.LOGIN_STR;
var db = pgp(connectionString);

module.exports.createUser = function(newUser, callback) {

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
