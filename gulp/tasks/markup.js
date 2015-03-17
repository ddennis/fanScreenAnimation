var gulp = require('gulp');

gulp.task('markup',['video'],  function() {
  return gulp.src('bin/*.html')
    .pipe(gulp.dest('build'));
});
