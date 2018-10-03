var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
})

// Start the server
app.set('port', 8085);

var server = app.listen(app.get('port'), function() {
	/* console.log('Express server listening on port ' + 8085); */
});