
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

	// application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};