var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Postmates = require('postmates');
var postmates = new Postmates('cus_Kp8cLL8C8C0Sp-', '3fc8dbff-8687-4623-833b-75f0665eaaae');
var twilio = require('twilio')('ACf948ff79af573ad96690bc47385448ad', 'f234fa52a77cd1fdb54b0c841e1cd7d6');

var routes = require('./routes/index');
var users = require('./routes/users');
var aedLocations = require('./routes/aedLocations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/aedLocations', aedLocations);

app.post('/postmate', function(req, res, next) {
	var quote = {
		pickup_address: req.body.pickup_address,
		dropoff_address: req.body.dropoff_address
  	};
  	
	postmates.quote(quote, function(err, response) {
		var delivery = {
		  manifest: req.body.manifest,
		  pickup_name: req.body.pickup_name,
		  pickup_address: req.body.pickup_address,
		  pickup_phone_number: req.body.pickup_phone_number,
		  pickup_notes: req.body.pickup_notes,
		  dropoff_name: req.body.dropoff_name,
		  dropoff_address: req.body.dropoff_address,
		  dropoff_phone_number: req.body.dropoff_phone_number,
		  dropoff_notes: req.body.dropoff_notes,
		  quote_id: response.body.quote_id
		}

		postmates.new(delivery, function(err, response2) {
			var successObj = {
				_delivery: response2.body,
				_quote: response.body
			}
  			res.send({ successObj });
		});

	});

});

app.post('/twilio', function(req, res, next) {
	twilio.sendMessage({

	    to: req.body.phoneNumber, // Any number Twilio can deliver to
	    from: '+13343924205', // A number you bought from Twilio and can use for outbound communication
	    body: req.body.AEDlink// body of the SMS message

	}, function(err, responseData) { //this function is executed when a response is received from Twilio

		if (!err) { // "err" is an error received during the request, if any

	        // "responseData" is a JavaScript object containing data received from Twilio.
	        // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
	        // http://www.twilio.com/docs/api/rest/sending-sms#example-1

	        console.log(responseData.from); // outputs "+14506667788"
	        console.log(responseData.body); // outputs "word to your mother."

	    }
	});

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
