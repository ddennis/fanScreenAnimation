var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var buildDir = require("../config").buildDir 

gulp.task('images', function() {
  var dest = buildDir + '/images';
  return gulp.src('./bin/images/**')
    .pipe(changed(dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(dest));
});
