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

gulp.task('plyGrid', function() {
  gulp.src('./src/scss/ply-grid.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: false }
  ))
  .pipe(rename('ply-grid.min.css'))
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

gulp.task('styles', function() {
  gulp.src('./src/scss/styles.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('stylesMin', function() {
  gulp.src('./src/scss/styles.scss')
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(autoprefixer(
    { cascade: true }
  ))
  .pipe(rename('styles.min.css'))
  .pipe(gulp.dest('./dist/css/'))
});

gulp.task('buildJs', function() {
  gulp.src('./src/react_components/*')
  .pipe(babel())
  .pipe(concat('index.js'))
  .on('error', function(error){
    gutil.log(gutil.colors.red(error.message));
      this.emit('end');
  })
  .pipe(gulp.dest('./lib'));
});

gulp.task('default',function() {
  gulp.watch('./src/scss/styles.scss',['styles','stylesMin']);
  gulp.watch('./src/**/*.js',['buildJs'])
});