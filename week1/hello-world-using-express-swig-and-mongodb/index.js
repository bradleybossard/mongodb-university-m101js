var express = require('express');
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var app = express()

var port = 9100;

var mongoclient = new MongoClient(new Server('localhost', 27019, {'native_parser' : true}));
var db = mongoclient.db('course');
//var db;
// No connection to mongo at this point, just setting up connection information.

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  db.collection('hello_mongo_express').findOne({}, function(err, doc) {
    res.render('hello', doc);
  });
});

app.get('*', function(req, res) {
  // res.send('Page not found', 404);  // deprecated
  res.status(404).send('Page not found');
});

console.log('point0');
mongoclient.connect(function (err, client) {
  console.log('point1');
  if (err) throw err;

  db = client.db('course');

  app.listen(9100);
  console.log('Server running on localhost:' + port);
});

