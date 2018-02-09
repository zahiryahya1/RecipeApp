var promise = require('bluebird');
var db_info = require('../db-info');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = db_info.LOGIN_STR;
var db = pgp(connectionString);

module.exports.getIngredients = function(callback) {
	console.log('getting all ingredients');

	db.any('SELECT * FROM ingredients order by name asc')
	.then(function(data) {
		callback(data, false);
	})
	.catch(function(err) {
		callback(err, true);
	});
}
