
// routes ======================================================================  
// application -------------------------------------------------------------
// expose the routes to our app with module.exports
module.exports = function(app) {
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

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
			var core = req.db.collection('userinfo');
			core.find().toArray(function(err, items) {
				res.json(items);
			});

		}
		else
		{
			res.send("NOooo");
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
		var core = req.db.collection('userinfo');
		core.insert(postData, function(err,results){
			if(err) throw err;
		})
	});

	// update chat -------------------------------------------------------------
	app.get('/updatechat', function(req, res) {
		// Connect to the db
		var core = req.db.collection('chat');
		core.find().toArray(function(err, items) {
			res.json(items); 
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
		var core = req.db.collection('chat');
		core.insert(postData, function(err,results){
			if(err) throw err;
		})
	});

	// clear chat -------------------------------------------------------------
	app.post('/clearchat', function(req, res) {
		// Connect to the db
		req.db.collection('chat').remove();
	});

	// MANGA DB ---------------------------------------------------------------

	app.get('/manga/:manganame/:pagenum', function (req, res, next) {
		var options = {
			root: __dirname + '/public/',
			dotfiles: 'deny',
			headers: {
				'x-timestamp': Date.now(),
				'x-sent': true
			}
		};

		var fileName = req.params.name;
		res.sendFile(fileName, options, function (err) {
			if (err) {
				next(err);
			} else {
				console.log('Sent:', fileName);
			}
		});

	});
};