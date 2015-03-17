var gulp = require('gulp');

var buildDir = require("../config").buildDir 

gulp.task('markup',['video'],  function() {
  return gulp.src('bin/*.html')
    .pipe(gulp.dest(buildDir));
});
