// var express = require('express');
// var router = express.Router();
// var bodyParser = require('body-parser');
// router.use(bodyParser.json()); // support json encoded bodies
// router.use(bodyParser.urlencoded({ extended: true }));

// var Postmates = require('postmates');
// var postmates = new Postmates('cus_Kp8cLL8C8C0Sp-', '3fc8dbff-8687-4623-833b-75f0665eaaae');

// router.use(express.bodyParser());

// router.post('/', function(req, res, next) {
// 	var delivery = {
// 		pickup_address: req.body.pickup_address,
// 		dropoff_address: req.body.dropoff_address
//   	};

// 	postmates.quote(delivery, function(err, response) {
// 		res.send({ quote: response.body });
// 	});

// });

// module.exports = router;
