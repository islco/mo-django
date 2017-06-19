import gulp from 'gulp'
import runSequence from 'run-sequence'
import './gulp/build'
import './gulp/production'
import './gulp/utils'
import EXTRAS_GLOB from './gulp/build'

gulp.task('build', (done) => {
  runSequence('clean', ['webpack', 'css', 'extras'], done)
})

gulp.task('build:production', (done) => {
  runSequence('build', ['minify:css', 'minify:js'], done)
})

gulp.task('watch', ['build'], () => {
  const browserSync = require('browser-sync').create()
  browserSync.init({
    ghostMode: false,
    proxy: '127.0.0.1:' + (parseInt(process.env.PORT, 10) - 100), // subtract 100 because foreman adds 100 to each success worker in the Procfile
    files: './{{ cookiecutter.package_name }}/static/**/*',
    open: false,
    port: process.env.PORT,
    ui: {
      port: (parseInt(process.env.PORT, 10) + 1)
    }
  })

  gulp.watch('src/static/js/**/*.js', ['webpack'])
  gulp.watch('src/static/css/**/*.css', ['css'])
  gulp.watch(EXTRAS_GLOB, ['extras'])
})

gulp.task('default', ['build'])
