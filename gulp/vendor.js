
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('vendor' , function() {
	return gulp.src(['vendor/*.js'])
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('build'))
		.pipe(uglify())
		.pipe(rename('vendor.min.js'))
		.pipe(gulp.dest('build'))
		.on('error', gutil.log)
});



/*
gulp.task('vendor', ['video'], function() {
    return gulp.src('vendor*/
/*.js')
        .pipe(gulp.dest('build'));
});
*/
