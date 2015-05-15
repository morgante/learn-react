var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var server = require("./server/index");

process.on("uncaughtException", function(err) {
	process.stderr.write("UNCAUGHT EXCEPTION:\n\n" + require("util").inspect(err) + "\n\n");
});

// Basic usage
gulp.task('scripts:compile', function() {
	console.log('scripts compile...');
	
	// set up the browserify instance on a task basis
	var b = browserify({
		entries: './app/main.js',
		debug: true,
		// defining transforms here will avoid crashing your stream
		transform: ["reactify"]
	});

	return b.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./public/'));

});

gulp.task('scripts:watch', function () {
	gulp.watch('./app/**/*.js', [ 'scripts:compile' ]);
});

/**
 * Compile Sass
 */
gulp.task('sass:compile', function () {
	gulp.src('./stylesheets/*.scss')
		.pipe(sass())
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/'));
});

gulp.task('sass:watch', function () {
		gulp.watch('./stylesheets/**/*.scss', [ 'sass:compile' ]);
});

/**
 * Start express
 */
gulp.task('express:start', function() {
	server();
});

gulp.task('compile', [ 'sass:compile', 'scripts:compile' ]);
gulp.task('watch', [ 'sass:watch', 'scripts:watch' ]);
gulp.task('server', [ 'compile', 'watch', 'express:start' ]);
gulp.task('default', [ 'server' ]);
