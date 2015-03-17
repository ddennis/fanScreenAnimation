/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any files in that directory get
  automatically required below.

  To add a new task, simply add a new task file that directory.
  gulp/tasks/default.js specifies the default set of tasks to run
  when you run `gulp`.
*/

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });


//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
// This is for minifying the vendor folder, should only run , when updates to vendor folder
//------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------
//
var gulp         = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var filesize = require('gulp-filesize');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('vendor' , function() {
  return gulp.src(['vendor/*.js'])
    .pipe(concat('vendor.js'))
    //.pipe(gulp.dest('build'))
    .pipe(uglify())
    .pipe(rename('vendor.min.js'))
    .pipe(gulp.dest('build'))
    .on('error', gutil.log)
});



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// DEPLOY ---------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------

// import the htmlreplace so we can use it
var htmlreplace = require('gulp-html-replace');
var es = require('event-stream');

// Get Manifest file, which sould contain the path to openspace
//var p = require('./subseroManifest.json');
// Combine the path(ip adress) to the openspace folder and the path to the current project
//var projectLocationOnOpenspace = p.path_to_openspace + p.project_location;
var pathToAmazon = ""//p.basePathAmazon




// The Deploy task replaces the script tag all the html files, and moves the files to a folder 
gulp.task('deploy', function() {

    // For debugging 
    //-----------------------------------------------------------------------------
    console.log ("FILES WRITTEN TO:  "+projectLocationOnOpenspace  ); 
    console.log ("UPLOADING" ); 
    //----------------------------------------------------------------------------------------------
  
    // Get alle HTML files, and replace the script tag with the minifyed version
    var replaceScriptTag = gulp.src('build/*.html')
    .pipe(htmlreplace({        
        'js': 'app.min.js',
        'vendor': 'vendor.min.js'
    }));

    // Get all files from build, except the HTML files, which we already modifyed
    var filesFromBuild = gulp.src(['build/*.js', 'build/*/**/**']);

    return es.merge (filesFromBuild, replaceScriptTag)
    .pipe(gulp.dest(projectLocationOnOpenspace));    
  
});


var replace = require('gulp-replace');

gulp.task('final', function() {
    
    var replaceimagePath = gulp.src(['src/app/**/*.js', 'src/app/*.js'])        
    .pipe(concat('app.js'))        
    //.pipe(gulp.dest('build'))        
    .pipe(replace(/basePath: "",/g, "basePath: '" + pathToAmazon + "',"))
    .pipe(uglify())
    .pipe(rename('app.min.js'));
        
        
    /*var replaceimagePath = gulp.src(['src/app/config.js'])
    .pipe(replace(/basePath: "",/g, "basePath: '" + pathToAmazon + "',"))*/
    
    var filesFromBuild = gulp.src(['build/*.js', 'build/*/**/**']);

    var replaceScriptTag = gulp.src('build/*.html')
    .pipe(htmlreplace({        
        'js': pathToAmazon + 'app.min.js', 
        'vendor': pathToAmazon + 'vendor.min.js', 
    }));

    return es.merge (filesFromBuild, replaceimagePath, replaceScriptTag)
    .pipe(gulp.dest("final"));    
  
});

