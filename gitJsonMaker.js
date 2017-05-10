
	// Json file
	var fs = require('fs')

	// Github
	var request = require('request');


	// GIT Options
	var optionsGitUserInfo = {
		url: 'https://api.github.com/users/dfejza',
		headers: {
			'User-Agent': 'request'
		}
	};
	var optionsGitUserRepos = {
		url: 'https://api.github.com/users/dfejza/repos',
		headers: {
			'User-Agent': 'request'
		}
	};
	// Bit Bucket Options
	var optionsBitBucketUser = {
		url: 'https://api.bitbucket.org/2.0/users/dfejza',
		headers: {
			'User-Agent': 'request'
		}
	};
	var optionsBitBucketUserRepos = {
		url: 'https://api.bitbucket.org/2.0/repositories/dfejza',
		headers: {
			'User-Agent': 'request'
		}
	};

	// README URLS
	var engReadme = "https://raw.githubusercontent.com/dfejza/portfolio/master/README.md";
	var jpReadme = "https://raw.githubusercontent.com/dfejza/portfolio/master/READMEJP.md"





	// Lets read the JSON file
	fs.readFile('./resources/data/data.json', 'utf-8', function(err, data) {
		if (err) throw err

			var jsonFile = JSON.parse(data)
		var flag1 = false;
		var flag2 = false;
		var flag3 = false;
		var flag4 = false;

		// lets POST request the GIT and Bitbucket info
		// First Git User
		request(optionsGitUserInfo, function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);

		    // Write the data into the loaded json
		    jsonFile.page3.git.icon = info.avatar_url;
		    jsonFile.page3.git.followers = info.followers;
		    jsonFile.page3.git.following = info.following;
		    jsonFile.page3.git.username = info.login;
		    jsonFile.page3.git.usernameLink = info.html_url;
		    jsonFile.page3.git.repoCount = info.public_repos;
		    flag1 = true;
		}
	});

		// Next Bit Bucket User
		request(optionsBitBucketUser, function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);

		    // Write the data into the loaded json
		    jsonFile.page3.bitB.followers = "NA";
		    jsonFile.page3.bitB.following = "NA";
		    jsonFile.page3.bitB.username = info.username;
		    jsonFile.page3.bitB.usernameLink = "https://bitbucket.org/dfejza/";
		    jsonFile.page3.bitB.repoCount = "2";
		    //console.log(info);
		    flag2 = true;

		}
	});

		// Next Git repos
		request(optionsGitUserRepos, function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body);

			// Clear previous data 
			delete jsonFile.page3.git.repos;
			jsonFile.page3.git.repos = [];

			// Holder for the object about to place
			info.forEach(function(value){
				jsonFile.page3.git.repos.push({
					name : value.name,
					link : value.html_url,
					image : "",
					fullname : value.fullname,
					description : value.description
				});
			})

			flag3 = true;
		}
	});

	// Finally BB repos
	request(optionsBitBucketUserRepos, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);

			delete jsonFile.page3.bitB.repos;
			jsonFile.page3.bitB.repos = [];
			// Holder for the object about to place
			info.values.forEach(function(value){
				jsonFile.page3.bitB.repos.push({
					name : value.name,
					link : value.html_url,
					image : "",
					fullname : value.fullname,
					description : value.slug
				});
			})

			flag4 = true;
		}
	});

		// Scratchy method of waiting for all async tasks
		var _flagCheck = setInterval(function() {
			if (flag1 === true && flag2 === true && flag3 === true && flag4 === true) {
				clearInterval(_flagCheck);
				//console.log(jsonFile);
				//// Write to JSON file
				fs.writeFile('./resources/data/data.json', JSON.stringify(jsonFile), 'utf-8', function(err) {
					if (err) throw err
						console.log('Done!')
				})
			}
		}, 1000); // interval set at 1 second







	})

// Create the ENG readme HTML site
request(engReadme, function (error, response, body) {
	// Next lets parse the readme files and convert from markdown to HTML
	var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    html      = converter.makeHtml(body);
    
    fs.writeFile(("./mainENG.html"), html,function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The English main HTML was saved!");
	}); 
});

// Create the JP readme HTML site
request(jpReadme, function (error, response, body) {
	// Next lets parse the readme files and convert from markdown to HTML
	var showdown  = require('showdown'),
    converter = new showdown.Converter(),
    html      = converter.makeHtml(body);
    
    fs.writeFile(("./mainJPN.html"), html,function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The JPN main HTML was saved!");
	}); 
});

