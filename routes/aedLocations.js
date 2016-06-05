var express = require('express');
var router = express.Router();
var $ = jQuery = require('jquery');
require('../public/javascripts/jquery.csv.min.js');


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
	var AED = {};
	var csvFile;
	$.get("/data/aeds.csv", function(res) {
	  csvFile = res;
	  var result = $.csv.toObjects(csvFile);
	  var i;
	  for (i=0; i<result.length; i++) {
	  	if (result[i].id = id) {
	  		  res.render('aedLocation', { title: 'AED #' + id, AED: result[i] });
	  	}
	  }
	});
  
});

module.exports = router;
