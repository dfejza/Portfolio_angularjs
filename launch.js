var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;// Retrieve
var fs = require('fs');
var http = require('http');
var mustacheExpress = require('mustache');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static('/home/brah/website'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/login', function(req,res) {

	var postData = {
	    login : req.body.login,
		pass : req.body.pass,
	}
	console.log(postData);
	if(postData.login == "admin1" && postData.pass == "admin1")
	{
		// Connect to the db
		MongoClient.connect("mongodb://admin:admin@ds133961.mlab.com:33961/portfolio", function(err, db) {
		  if(!err) {
		    var core = db.collection('message');
		    core.find().toArray(function(err, items) {
		    	res.json(items); 
		    });
		    
		  }
		});
	}
	else
	{
		res.send("NO");
	}
});

app.post('/sendtodb', function(req, res) {
	var postData = {
	    date : req.body.date,
		ip : req.body.ip,
		name : req.body.name,
		email : req.body.email,
		message : req.body.message
	}

	// Connect to the db
	MongoClient.connect("mongodb://admin:admin@ds133961.mlab.com:33961/portfolio", function(err, db) {
	  if(!err) {
	    console.log("We are connected");
	    var core = db.collection('message');
	    core.insert(postData, function(err,results){
	    	if(err) throw err;
	    })
	  }
	});
	
});


app.listen(8080);