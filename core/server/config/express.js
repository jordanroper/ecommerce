var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function() {
  var app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use(express.static('./core/public'));

  return app;
}
