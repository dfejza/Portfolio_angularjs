var express = require('express');
var app = express();
var path = require('path');
app.use(express.static('/home/brah/website'))

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    console.log(__dirname);
});


app.listen(8080);