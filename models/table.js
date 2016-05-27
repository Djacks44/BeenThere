var orm = require('../config/orm.js');

var user = {
	findOne: function(condition, cb) {
	  orm.findOne('table', condition, function(res){
	      cb(res);
	  });
  },
	all: function(cb) {
		orm.all('table', function(res){
			cb(res);
		});
	},
	//cols and vals are arrays
	create: function(cols, vals, cb) {
		orm.create('table', cols, vals, function(res){
			cb(res);
		});
	},
	update: function(objColVals, condition, cb) {
		orm.update('table', objColVals, condition, function(res){
			cb(res);
		});
	},
	delete: function(condition, cb){
		orm.delete('table', condition, function(res){
			cb(res);
		});
	}
};

module.exports = table;