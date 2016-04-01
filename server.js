// These top two lines help our app know whether it's deployed locally or on Heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
// if you want to only run locally, comment out these lines above and comment in the line below.
// var port = 3000;

var express = require('./node_modules/express');
var mongojs = require('./node_modules/mongojs');
var bodyParser = require('./node_modules/body-parser');
var cors = require('./node_modules/cors');
var passport = require('./node_modules/passport');
var session = require('express-session');

var config = require('./config.json');

var app = express();
app.use(express.static(__dirname + '/core/public'));
app.use(bodyParser.json());
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}));

var db = mongojs('ecommerce', ['products']);

app.get('/api/products', function(req, res){
  res.send("I am a random string in GET api/products");});
app.get('/api/products/:id', function(req, res){
  res.send("I will GET you a present at api/products. It is a " + req.params.id);});
// app.post('/api/products', function(req, res){
//   res.send("Jellyfish live in POST api/products");});
app.post('/api/products', function(req, res){
      db.products.save(req.body, function(error, response){
          if(error) {
              return res.status(500).json(error);
          } else {
              return res.json(response);
          }
      });
  });
app.put('/api/products/:id', function(req, res){
  res.send("Once I was a walrus but then I was PUT in api/products with " + req.params.id);});
app.delete('/api/products/:id', function(req, res){
   res.send("I have deleted nothing, especially not " + req.params.id)});


app.listen(port, function () {
    console.log('listening on ' + port);
});
