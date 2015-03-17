

var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sourcemaps = require('gulp-sourcemaps');
var buildDir = require("../config").buildDir 
var handleErrors = require('../util/handleErrors');

console.log("buildDir = ", buildDir);


/*
gulp.task('vendor', function() {
    return gulp.src('vendor*/
/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/app.js'))
});*/



gulp.task('concat' , function() {
    return gulp.src(['src/app/**/*.js', 'src/app/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildDir))
        .pipe(filesize())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest(buildDir))
        .pipe(filesize())
        //.on('error', gutil.log);
        .on('error', handleErrors);
});

//
//gulp.task('concat' , function() {
//    return gulp.src('./src/app/**/*.js')
//        .pipe(sourcemaps.init())
//        .pipe(concat('app.js'))
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest('./build'))
//        .pipe(filesize())
//        .pipe(uglify())
//        .pipe(rename('app.min.js'))
//        .pipe(gulp.dest('./build'))
//        .pipe(filesize())
//        .on('error', gutil.log)
//});


