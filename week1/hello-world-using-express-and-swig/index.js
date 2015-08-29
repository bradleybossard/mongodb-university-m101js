var express = require('express');
var cons = require('consolidate');
var app = express()

var port = 9100;


app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  res.render('hello', { 'name' : 'Swig' });
});

app.get('*', function(req, res) {
  // res.send('Page not found', 404);  // deprecated
  res.status(404).send('Page not found');
});

app.listen(9100);

console.log('Server running on localhost:' + port);
