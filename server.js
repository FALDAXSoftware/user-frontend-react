var express = require('express');
// var fs = require('fs')
var path = require('path');
// var logger = require('morgan');
// var cors = require('cors');

var app = express();

// app.use(logger('dev'));

// create a write stream (in append mode)
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// setup the logger
// app.use(logger('combined', {stream: accessLogStream}));

// app.use(cors());


// tell the app to look for static files in these directories
// app.use(express.static(path.join(__dirname, 'assets/users')));

app.use(express.static(path.join(__dirname, 'build')));
console.log(__dirname);
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

// app.all('/*', function(req, res, next) {

// 	// CORS headers
// 	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// 	// Set custom headers for CORS
// 	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization,Client-Key');

// 	if (req.method == 'OPTIONS') {
// 		res.status(200).end();
// 	} else {
// 		next();
// 	}
// });



// If no route is matched by now, it must be a 404
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// Start the server
app.set('port', 9000);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + 9000);
});