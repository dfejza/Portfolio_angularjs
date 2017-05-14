// A very basic web server in node.js
// Stolen from: Node.js for Front-End Developers by Garann Means (p. 9-10)

var port = 8080;
var serverUrl = "localhost";

var http = require("http");
var path = require("path");
var fs = require("fs");
var checkMimeType = true;

console.log("Starting web server at " + serverUrl + ":" + port);

http.createServer( function(req, res) {

	var now = new Date();

	var filename = req.url || "index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",
		".js": "resources/js",
		".css": "text/css",
		".jpg": "resources/images",
		".gif": "resources/images",
		".png": "resources/images",
		".json": "resources/data"
	};

	var validMimeType = true;
	var mimeType = validExtensions[ext];
	if (checkMimeType) {
		validMimeType = validExtensions[ext] != undefined;
	}

	if (validMimeType) {
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, mimeType);
			} else {
				console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} else {
		console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
	}

}).listen(port, serverUrl);

function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			if (mimeType != undefined) {
				res.setHeader("Content-Type", mimeType);
			}
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}
