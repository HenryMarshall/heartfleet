var express = require('express');
var router = express.Router();

var Postmates = require('postmates');
var postmates = new Postmates('cus_Kp8cLL8C8C0Sp-', '3fc8dbff-8687-4623-833b-75f0665eaaae');
/* GET home page. */
router.get('/', function(req, res, next) {
	var delivery = {
		pickup_address: "20 McAllister St, San Francisco, CA",
		dropoff_address: "101 Market St, San Francisco, CA"
  };

	postmates.quote(delivery, function(err, response) {
		res.render('index', { quote: response.body });
	});

});

module.exports = router;
