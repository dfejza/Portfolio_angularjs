// set up ======================================================================
var express = require('express');
//var app = express();

var app = require('express')();
var expressMongoDb = require('express-mongo-db');
app.use(expressMongoDb('mongodb://localhost:27017/portfolio'));

var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var mustacheExpress = require('mustache');

var port     = process.env.PORT || 8080; // set the port
// configuration ===============================================================
app.use(express.static(__dirname + '/public'));// set the static files location /public/img will be /img for users
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
