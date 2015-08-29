var express = require('express');
var app = express()

var port = 9100;

app.get('/', function(req, res) {
  res.send('Hello, World!');
});

app.get('*', function(req, res) {
  // res.send('Page not found', 404);  // deprecated
  res.status(404).send('Page not found');
});

app.listen(9100);

console.log('Server running on localhost:' + port);
