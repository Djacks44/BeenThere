var orm = require('../config/orm.js');

var user = {
	findOne: function(condition, cb) {
	  orm.findOne('data', condition, function(res){
	      cb(res);
	  });
  },
	all: function(cb) {
		orm.all('data', function(res){
			cb(res);
		});
	},
	//cols and vals are arrays
	create: function(cols, vals, cb) {
		orm.create('data', cols, vals, function(res){
			cb(res);
		});
	},
	update: function(objColVals, condition, cb) {
		orm.update('data', objColVals, condition, function(res){
			cb(res);
		});
	},
	delete: function(condition, cb){
		orm.delete('data', condition, function(res){
			cb(res);
		});
	}
};

module.exports = data;