/* jshint node: true, browser: false, jquery: false */

'use strict';

var gulp    = require('gulp'),
$           = require('gulp-load-plugins')({ lazy: false }),  // jshint ignore:line
minimist    = require('minimist'),
fs          = require('fs'),
path        = require('path'),
browserSync = require('browser-sync'),
es          = require('event-stream'),
lazypipe    = require('lazypipe');

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'local' }
};
var options = minimist(process.argv.slice(2), knownOptions);

/**
 * project-wide variables
 */
// __dirname is absolute path to project root
var config         = require(path.join(__dirname, 'gulp-config.js')),
    vendorFiles    = require(path.join(__dirname, 'gulp-assets.json'));

var projectNameDashed = (function() {
  var shell = require('shelljs');
  var projectName = shell.exec('basename `git config --get remote.origin.url` .git',
                               { silent: true, async: false }).output;
  projectName = projectName.replace(/[\n\r]/g, '');
  return projectName.replace(/[._]/g, '-');
})();


/**
 * Creates an array of gulp streams for concatenating an array of files
 * @param {object} files - Key is dest filename, val is array of files to be concatenated
 * @param {string} dist - Destination path
 */
function vendorMap(files, dist) {
  return Object.keys(files).map(function(distFile) {
    var srcFiles = files[distFile].map(function(file) {
      return config.src + file;
    });
    return gulp.src(srcFiles)
    .pipe( $.concat(path.basename(distFile)) )
    .pipe( gulp.dest(dist + path.dirname(distFile)) );
  });
}


gulp.task('fonts', function() {
  var vendorFonts = gulp.src( require('main-bower-files')({ paths: config.bower }), { read: false } )
  .pipe( $.if(config.fonts.glob, gulp.dest(config.fonts.dist)) );

  var appFonts = gulp.src( [config.fonts.src + config.fonts.glob] )
  .pipe( $.if(config.fonts.glob, gulp.dest(config.fonts.dist)) );

  return es.merge.apply(null, [vendorFonts, appFonts]);
});


gulp.task('images', function() {
  return gulp.src( [config.img.src + config.img.glob, '!**/_*', '!**/_*/*'] )
  .pipe( $.plumber({ errorHandler: $.notify.onError('Error: <%= error.message %>') }))
  .pipe( $.imagemin(config.imagemin) )
  .pipe( gulp.dest(config.img.dist) );
});


gulp.task('css', function () {
  var sassChannel = lazypipe()
  .pipe( $.sourcemaps.init )
  .pipe( $.sass, config.nodeSass )
  .pipe( $.autoprefixer, config.autoprefixer )
  .pipe( $.sourcemaps.write )
  .pipe( gulp.dest, config.css.dist )
  .pipe( browserSync.reload, { stream: true } );

  var appStream = gulp.src( config.sass.src + config.sass.glob )
  .on('error', $.notify.onError('Error: <%= error.message %>'))
  .pipe(sassChannel());

  var vendorStream = vendorMap(vendorFiles.css, config.dist);

  return es.merge.apply(null, vendorStream.concat(appStream));
});


gulp.task('js', function() {
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var bundles = config.browserify.bundles;
  var appStream = [];

  bundles.forEach(function(bundleConfig) {
    var b = browserify(bundleConfig);
    appStream.push(
      b.bundle()
      .on('error', function(err) {
        $.util.log($.util.colors.red(err.message));
        this.emit('end');
      })
      .pipe( source(bundleConfig.outputName) )
      .pipe( gulp.dest(bundleConfig.dest) )
      .pipe( browserSync.reload({stream: true}) )
    );
  });

  var vendorStream = vendorMap(vendorFiles.js, config.dist);

  // flatten arrays of streams and single streams into one array of streams
  var jsStream = Array.prototype.concat.apply([], [appStream, vendorStream]);
  return es.merge.apply(null, jsStream);
});


gulp.task('modernizr', function() {
  return gulp.src( [config.js.src + config.js.glob, config.sass.src + config.sass.glob] )
  .pipe( $.modernizr( config.modernizr ) )
  .pipe( gulp.dest(config.js.src + 'vendor/') );
});


gulp.task('browser-sync', function() {
  browserSync({
    port: config.browserSync.port,
    proxy: "localhost:8000"
  });
});


gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(config.js.src + config.js.glob, ['js', browserSync.reload]);
  gulp.watch(config.sass.src + config.sass.glob, ['css']); // stream reloads in css task
  gulp.watch(config.img.src + config.img.glob, ['images', browserSync.reload]);
  gulp.watch(config.fonts.src + config.fonts.glob, ['fonts', browserSync.reload]);
  gulp.watch(config.src + 'gulp-assets.json', ['js', 'css', browserSync.reload]);
});


gulp.task('build', function() {
  require('run-sequence')(
    ['css', 'js', 'fonts', 'images']
  );
});


gulp.task('help', ['list']);
gulp.task('list', $.taskListing);


gulp.task('default', ['build']);
