var gulp = require('gulp');


gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});