var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
	var object = {
		logged_in: req.session.logged_in,
        id: req.session.user_id,
        name: req.session.user_email
	}
  res.render('home', object);
});

module.exports = router;
