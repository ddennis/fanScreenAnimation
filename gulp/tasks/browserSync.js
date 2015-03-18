var browserSync = require('browser-sync');
var gulp        = require('gulp');
var buildDir = require("../config").buildDir

gulp.task('browserSync', ['build'], function() {
  browserSync({
    server: {
      // src is included for use with sass source maps
      baseDir: [buildDir , 'src'],
	    proxy: "localhost:8888"
    },



    files: [
      // Watch everything in build
      buildDir +"/**",
      // Exclude sourcemap files
      buildDir +"/**.map"
    ], port:4000
  });
});
