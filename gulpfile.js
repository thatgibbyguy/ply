var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('ply', function() {
  gulp.src('./scss/ply-iso.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(rename('ply.css'))
  .pipe(gulp.dest('./css/'))
});

gulp.task('plyMin', function() {
  gulp.src('./scss/ply-iso.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('ply.min.css'))
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