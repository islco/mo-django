'use strict'

const fs = require('fs')
const gulp = require('gulp')
const gutil = require('gulp-util')
const del = require('del')
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const stylelint = require('gulp-stylelint')
const sourcemaps = require('gulp-sourcemaps')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')
const uglify = require('gulp-uglify')
const cleancss = require('gulp-clean-css')
const gulpif = require('gulp-if')
const plumber = require('gulp-plumber')
const runSequence = require('run-sequence')
const browserslist = 'last 2 versions, Firefox ESR'  // see https://github.com/ai/browserslist#queries
const extrasGlob = './{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}'

let bundler = browserify({ entry: true, debug: true })
  .add('./{{ cookiecutter.package_name }}/static_src/js/app.js')
  .transform('eslintify', { continuous: true })

function bundle() {
  return bundler.bundle()
  .on('error', function(err) {
    gutil.log(gutil.colors.red(err.message))
    this.emit('end')
  })
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js/'))
}


gulp.task('browserify', () => {
  return bundle()
})

gulp.task('watchify', () => {
  const watchify = require('watchify')
  bundler = watchify(bundler)
  bundler.on('update', () => {
    gutil.log('-> bundling...')
    bundle()
  })
  return bundle()
})

gulp.task('sass', () => {
  return gulp.src('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(stylelint({
      browsers: browserslist,
      syntax: 'scss',
      reporters: [ { formatter: 'string', console: true } ],
      failAfterError: false
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({% if cookiecutter.use_foundation_sites == 'y' -%}{
      includePaths: ['node_modules/foundation-sites/scss']
    }{%- endif %}))
    .pipe(postcss([autoprefixer({ browsers: browserslist })]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/css/'))
})

gulp.task('extras', () => {
  return gulp.src(extrasGlob)
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/'))
})

gulp.task('watch', ['watchify'], () => {
  const browserSync = require('browser-sync').create()
  browserSync.init({
    proxy: '127.0.0.1:8000',
    files: './public/**/*'
  })

  gulp.watch('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss', ['sass']);
  gulp.watch(extrasGlob, ['extras']);
  gulp.watch('./{{ cookiecutter.package_name }}/templates/**/*.html', [browserSync.reload])
})

gulp.task('minify', () => {
  return gulp.src(['./{{ cookiecutter.package_name }}/static/**/*'], { base: './{{ cookiecutter.package_name }}/static/' })
    .pipe(gulpif(/\.js$/, uglify({
      preserveComments: 'license',
      compressor: {
        screw_ie8: true
      },
      output: {
        preamble: (function() {
          var banner = fs.readFileSync('banner.txt', 'utf8')
          banner = banner.replace('@date', (new Date()))
          return banner
        }())
      }
    })))
    .pipe(gulpif(/\.css$/, cleancss()))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/'))
})

gulp.task('clean', () => {
  return del('./{{ cookiecutter.package_name }}/static/')
})

gulp.task('build', (done) => {
  runSequence(
    'clean',
    ['browserify', 'sass', 'extras'],
    done
  )
})

gulp.task('build:production', (done) => {
  runSequence(
    'build',
    'minify',
    done
  )
})

gulp.task('dev', (done) => {
  runSequence(
    'build',
    'watch',
    done
  )
})

gulp.task('default', ['build'])
