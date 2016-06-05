var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  res.render('aedLocation', { title: 'AED #' + id });
});

module.exports = router;
