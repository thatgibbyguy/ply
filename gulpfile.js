var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
	gulp.src('/scss/tgggrid.scss')
	  	.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css/'));
});

gulp.task('default',function() {
    gulp.watch('/scss/tgggrid.scss',['styles']);
});