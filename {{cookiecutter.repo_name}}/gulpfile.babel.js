import gulp from 'gulp'
import runSequence from 'run-sequence'
import './gulp/build'
import './gulp/production'
import './gulp/utils'
import EXTRAS_GLOB from './gulp/build'


gulp.task('build', (done) => {
  runSequence('clean', ['browserify', 'sass', 'extras'], done)
})

gulp.task('build:production', (done) => {
  runSequence('build', ['minify:css', 'minify:js'], done)
})

gulp.task('watch', ['build', 'watchify'], () => {
  const browserSync = require('browser-sync')
  browserSync({
    proxy: `localhost:${parseInt(process.env.PORT, 10) - 100}`,
    files: './{{ cookiecutter.package_name }}/static/**/*',
  })

  // watchify task handles js files
  gulp.watch('./{{ cookiecutter.package_name }}/static_src/scss/**/*.scss', ['sass'])
  gulp.watch(EXTRAS_GLOB, ['extras'])
})

gulp.task('default', ['build'])
