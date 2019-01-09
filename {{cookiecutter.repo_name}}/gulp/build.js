import gulp from 'gulp'
import del from 'del'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass'
import concat from 'gulp-concat'


export const EXTRAS_GLOB = './{{ cookiecutter.package_name }}/static_src/**/*.{txt,json,xml,ico,jpeg,jpg,png,gif,svg,ttf,otf,eot,woff,woff2,mp3,mp4,ogv,ogg,webm}'

gulp.task('clean', () => del('./{{ cookiecutter.package_name }}/static/'))

gulp.task('sass', () =>
  gulp.src('./{{ cookiecutter.package_name }}/static_src/sass/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
  .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/css/'))
)

gulp.task('js', function() {
  return gulp.src('./{{ cookiecutter.package_name }}/static_src/js/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/js'));
});

gulp.task('extras', () =>
  gulp.src(EXTRAS_GLOB)
    .pipe(gulp.dest('./{{ cookiecutter.package_name }}/static/')))
