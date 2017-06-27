import gulp from 'gulp'
import gutil from 'gulp-util'
import del from 'del'
import autoprefixer from 'autoprefixer'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import browserify from 'browserify'
import plumber from 'gulp-plumber'

export const EXTRAS_GLOB = './{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2}'

let bundler = browserify(['./{{ cookiecutter.package_name }}/static_src/js/app.js'], { debug: true })
  .transform('babelify')
  .transform('uglifyify')

function bundle() {
  return bundler.bundle()
    .on('error', err => {
      gutil.log(gutil.colors.red(err.message))
      this.emit('end')
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js/'))
}


gulp.task('clean', () => del('./{{ cookiecutter.package_name }}/static/'))

gulp.task('browserify', () => bundle())

gulp.task('watchify', () => {
  const watchify = require('watchify')
  bundler = watchify(bundler)
  bundler.on('update', () => {
    gutil.log('-> bundling...')
    bundle()
  })
  return bundle
})

gulp.task('sass', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules/foundation-sites/scss'],
    }))
    .pipe(postcss([autoprefixer({
      // see https://github.com/ai/browserslist#queries
      // and https://github.com/google/web-starter-kit/blob/128b2efdab595e0a4c8a563fcf1d1724ef98b8aa/gulpfile.babel.js#L73
      browsers: [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
      ]
    })]))
    .pipe(sourcemaps.write())
    .pipe(plumber.stop())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/css/')))

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))
