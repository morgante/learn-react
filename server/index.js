var express = require('express');

function start() {
	var app = express();

	app.use(express.static(__dirname + '/../public'));

	app.listen(3000);

	console.log("listening");
}

module.exports = start;