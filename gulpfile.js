const {
  watch,
  series,
  src,
  dest
} = require('gulp');
const sass = require('gulp-sass')(require('sass'))
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
var minifyInline = require('gulp-minify-inline');

function clean(cb) {
  // body omitted
  cb();
}

function javascript(cb) {
  src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(minifyInline())
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
  cb();
}

function css(cb) {
  return src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyInline())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
  cb();
}

function html() {
  return src('src/**/*.html')
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
}

exports.default = function () {
  watch('src/scss/*.scss', css);
  watch('src/js/*.js', javascript);
  watch('src/**/*.html', html);
  // watch('src/js/*.js', series(clean,));
};