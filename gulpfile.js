var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    gutil = require('gulp-util'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');

gulp.task('ply', function() {
  gulp.src('./src/scss/ply-iso.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(rename('ply.css'))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('plyEssentials', function() {
  gulp.src('./src/scss/ply-essentials.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('ply-essentials.min.css'))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('plyHelpers', function() {
  gulp.src('./src/scss/ply-helpers.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('ply-helpers.min.css'))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('plyMin', function() {
  gulp.src('./src/scss/ply-iso.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('ply.min.css'))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('styles', function(done) {
  gulp.src('./src/scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(gulp.dest('./dist/css/'))
  done()
});

gulp.task('stylesMin', function(done) {
  gulp.src('./src/scss/styles.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest('./dist/css/'))
  done()
});

gulp.task('default',function() {
  gulp.watch('./src/scss/styles.scss',['styles','stylesMin','plyEssentials']);
});
