var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('tgggrid', function() {
  gulp.src('./scss/_tgggrid.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(gulp.dest('./css/'))
});

gulp.task('tgggridMinified', function() {
  gulp.src('./scss/_tgggrid.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('tgggrid.min.css'))
  .pipe(gulp.dest('./css/'))
});

gulp.task('styles', function() {
  gulp.src('./scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(gulp.dest('./css/'))
})

gulp.task('stylesMin', function() {
  gulp.src('./scss/styles.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest('./css/'))
})

gulp.task('default',function() {
  gulp.watch('./scss/styles.scss',['styles','stylesMin']);
});