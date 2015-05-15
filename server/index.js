var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");

function start() {
	var app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(express.static(__dirname + '/../public'));

	app.listen(3000);

	console.log("listening");
}

module.exports = start;
