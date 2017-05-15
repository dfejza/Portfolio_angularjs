
var MongoClient = require('mongodb').MongoClient;// Retrieve
// routes ======================================================================  
// application -------------------------------------------------------------
// expose the routes to our app with module.exports
module.exports = function(app) {
	// login -------------------------------------------------------------
	app.post('/login', function(req,res) {
		var postData = {
			login : req.body.login,
			pass : req.body.pass,
		}
		console.log(postData);
		if(postData.login == "admin1" && postData.pass == "admin1")
		{
			// Connect to the db
			MongoClient.connect("mongodb://localhost:27017/portfolio", function(err, db) {
				if(!err) {
					var core = db.collection('userinfo');
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

	// send data -------------------------------------------------------------
	app.post('/sendtodb', function(req, res) {
		var postData = {
			date : req.body.date,
			ip : req.body.ip,
			name : req.body.name,
			email : req.body.email,
			message : req.body.message
		}
		// Connect to the db
		MongoClient.connect("mongodb://localhost:27017/portfolio", function(err, db) {
			if(!err) {
				console.log("We are connected");
				var core = db.collection('userinfo');
				core.insert(postData, function(err,results){
					if(err) throw err;
				})
			}
		});
	});

	// update chat -------------------------------------------------------------
	app.get('/updatechat', function(req, res) {
		// Connect to the db
		MongoClient.connect("mongodb://localhost:27017/portfolio", function(err, db) {
			if(!err) {
				var core = db.collection('chat');
				core.find().toArray(function(err, items) {
					res.json(items); 
				});
			}
		});
	});

	// update chat -------------------------------------------------------------
	app.post('/insertchat', function(req, res) {
		var postData = {
			time : req.body.time,
			id : req.body.id,
			msg : req.body.msg,
		}
		// Connect to the db
		MongoClient.connect("mongodb://localhost:27017/portfolio", function(err, db) {
			if(!err) {
				var core = db.collection('chat');
				core.insert(postData, function(err,results){
					if(err) throw err;
				})
			}
		});
	});

	// clear chat -------------------------------------------------------------
	app.post('/clearchat', function(req, res) {
		// Connect to the db
		MongoClient.connect("mongodb://localhost:27017/portfolio", function(err, db) {
			if(!err) {
				db.collection('chat').remove();
			}
		});
	});

	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};