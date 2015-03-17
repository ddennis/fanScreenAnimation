var gulp = require('gulp');

gulp.task('video', function() {
	return gulp.src('bin/video/**')
		.pipe(gulp.dest('build/video'));
});
