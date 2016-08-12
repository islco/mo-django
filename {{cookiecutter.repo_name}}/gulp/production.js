import fs from 'fs'
import gulp from 'gulp'
import critical from 'critical'
import purifycss from 'gulp-purifycss'
import cleancss from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import header from 'gulp-header'

const BANNER = fs.readFileSync('banner.txt', 'utf8').replace('@date', (new Date()))


gulp.task('purifycss', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*-*.css')
    .pipe(purifycss(['./{{ cookiecutter.package_name }}/static/**/*.js', './{{ cookiecutter.package_name }}/static/**/*.html'], { minify: true }))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))

gulp.task('critical', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*.html')
    .pipe(critical.stream({
      base: './{{ cookiecutter.package_name }}/static/',
      inline: true,
      dimensions: [{
        width: 1336,  // desktop
        height: 768,
      }, {
        width: 1024,  // tablet
        height: 768,
      }, {
        width: 360,  // mobile
        height: 640,
      }],
    }))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))

gulp.task('minify:css', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*-*.css')
    .pipe(cleancss())
    .pipe(header(BANNER))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))

gulp.task('minify:js', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*-*.js')
    .pipe(uglify({
      preserveComments: 'license',
      compressor: {
        screw_ie8: true,
      },
      output: {
        preamble: BANNER,
      },
    }))
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))
