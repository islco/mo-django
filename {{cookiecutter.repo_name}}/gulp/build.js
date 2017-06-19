import gulp from 'gulp'
import del from 'del'
import sourcemaps from 'gulp-sourcemaps'
import suitcss from 'gulp-suitcss'
import stylelintConfig from '../stylelint.config'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'

export const EXTRAS_GLOB = './{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2,mp3,mp4,ogv,ogg,webm}'

gulp.task('clean', () => del('./{{ cookiecutter.package_name }}/static/'))

gulp.task('webpack', () =>
  webpackStream(require('../webpack.config.js'), webpack)
  .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js/')))

gulp.task('css', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static_src/css/app.css')
    .pipe(sourcemaps.init())
    .pipe(suitcss({
      stylelint: stylelintConfig,
      use: ['postcss-nested']
    }))
    .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/css/'))
)

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))
