var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

function start() {
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(express.static(__dirname + '/../public'));

	app.get('/comments.json', function(req, res) {
		fs.readFile(__dirname + '/comments.json', function(err, data) {
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
		});
	});

	app.post('/comments.json', function(req, res) {
		fs.readFile(__dirname + '/comments.json', function(err, data) {
			var comments = JSON.parse(data);
			comments.push(req.body);
			fs.writeFile(__dirname + '/comments.json', JSON.stringify(comments, null, 4), function(err) {
				res.setHeader('Content-Type', 'application/json');
				res.setHeader('Cache-Control', 'no-cache');
				res.send(JSON.stringify(comments));
			});
		});
	});

	app.listen(3000);

	console.log("listening");
}

module.exports = start;
