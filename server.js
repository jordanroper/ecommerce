// These top two lines help our app know whether it's deployed locally or on Heroku
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
// if you want to only run locally, comment out these lines above and comment in the line below.
// var port = 3000;

var express = require('./core/server/config/express');

var app = express();

app.listen(port, function () {
    console.log('listening on ' + port);
});
