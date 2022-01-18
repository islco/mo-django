import fs from 'fs'
import gulp from 'gulp'
import rev from 'gulp-rev'
import cleancss from 'gulp-clean-css'
import uglify from 'gulp-uglify'
import revReplace from 'gulp-rev-replace'
import header from 'gulp-header'

const MANIFEST_PATH = './{{ cookiecutter.package_name }}/static/rev-manifest.json'

gulp.task('rev', () =>
  gulp.src(['{{ cookiecutter.package_name }}/static/**/*', '!**/*.txt', '!**/*.ico'])
    .pipe(rev())
    .pipe(gulp.dest('{{ cookiecutter.package_name }}/static/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('{{ cookiecutter.package_name }}/static/')))

gulp.task('rev:replace', () =>
  gulp.src([
    './{{ cookiecutter.package_name }}/static/**/*.css',
    './{{ cookiecutter.package_name }}/static/**/*.js'
  ])
  .pipe(revReplace({ manifest: gulp.src(MANIFEST_PATH) }))
  .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))

gulp.task('minify:css', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*.css')
    .pipe(cleancss())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))

gulp.task('minify:js', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))
