'use strict';

const gulp           = require('gulp');
const gutil          = require('gulp-util');
const del            = require('del');
const concat         = require('gulp-concat');
const browserSync    = require('browser-sync').create();
const autoprefixer   = require('autoprefixer');
const postcss        = require('gulp-postcss');
const sass           = require('gulp-sass');
const sourcemaps     = require('gulp-sourcemaps');
const source         = require('vinyl-source-stream');
const buffer         = require('vinyl-buffer');
const browserify     = require('browserify');
const uglify         = require('gulp-uglify');
const cssnano        = require('gulp-cssnano');
const gulpif         = require('gulp-if');
const runSequence    = require('run-sequence');


function bundle(options) {
  options = options || {};
  const bundlerOpts = { entry: true, debug: true };
  let bundler = browserify(
    './{{ cookiecutter.package_name }}/static_src/js/{{ cookiecutter.repo_name }}.js', bundlerOpts
    )
    .transform('babelify', { presets: ['es2015'] });

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.message));
        this.emit('end');
      })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js/'));
  }

  if (options.watch) {
    const watchify = require('watchify');
    bundler = watchify(bundler);
    bundler.on('update', () => {
      gutil.log('-> bundling...');
      rebundle();
    });
  }

  return rebundle();
}

gulp.task('browserify', () => {
  return bundle();
});

gulp.task('watchify', () => {
  return bundle({ watch: true });
});

gulp.task('sass', () => {
  return gulp.src('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(
      {% if cookiecutter.use_foundation_sites == 'y' -%}
      {
        includePaths: [path.join(path.dirname(require.resolve('foundation-sites')), '../scss')]
      }
      {%- endif %}
    )
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/css/'));
});

gulp.task('extras', () => {
  return gulp.src('./{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff, woff2}')
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/'));
});

gulp.task('watch', ['sass', 'extras', 'watchify'], () => {
  browserSync.init({
    proxy: '127.0.0.1:8000'
  });
  gulp.watch('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss', ['sass']);
  gulp.watch('./{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff, woff2}', ['extras']);
});

gulp.task('banner', ['browserify'], () => {
  return gulp.src(['./public/banner.txt', './{{ cookiecutter.package_name }}/static/js/bundle.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js/'));
});

gulp.task('minify', () => {
  return gulp.src(['./{{ cookiecutter.package_name }}/static/**/*'],
                  { base: './{{ cookiecutter.package_name }}/static/' })
    // Only target the versioned files with the hash
    // Those files have a - and a 10 character string
    .pipe(gulpif(/-\w{10}\.js$/, uglify()))
    .pipe(gulpif(/-\w{10}\.css$/, cssnano()))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/'));
});

gulp.task('clean', () => {
  return del('./{{ cookiecutter.package_name }}/static/');
});

gulp.task('build', (done) => {
  runSequence(
    'clean',
    ['browserify', 'sass', 'extras'],
    done
  );
});

gulp.task('build:production', (done) => {
  runSequence(
    'build',
    ['banner', 'minify'],
    done
  );
});

gulp.task('start', (done) => {
  runSequence(
    'build',
    'watch',
    done
  );
});

gulp.task('default', ['build']);
