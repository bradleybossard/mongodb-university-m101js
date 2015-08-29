var express = require('express');
var cons = require('consolidate');
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var app = express()

var port = 9100;

var mongoclient = new MongoClient(new Server('localhost', 27017));
var db = mongoclient.db('course');
// No connection to mongo at this point, just setting up connection information.

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
  db.collection('hello_mongo_express').findOne({}, function(err, doc) {
    if (err) throw err;

    res.render('hello', doc);
  });
});

app.get('*', function(req, res) {
  // res.send('Page not found', 404);  // deprecated
  res.status(404).send('Page not found');
});

mongoclient.open(function (err, mongoclient) {

  if (err) throw err;

  app.listen(9100);
  console.log('Server running on localhost:' + port);
});

