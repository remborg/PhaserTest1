var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');


var sass = require('gulp-ruby-sass');
gulp.task('sass', function() {
    return sass('src/scss/style.scss', {style: 'compressed'})
        .pipe(gulp.dest('build/css/'))
        .pipe(livereload());
});

gulp.task('copyJs', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('build/js/'))
        .pipe(livereload());
});
gulp.task('copyHtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        .pipe(livereload());
});
gulp.task('copyImg', function() {
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg'])
        .pipe(gulp.dest('build/img/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  // Watch .js files
  gulp.watch('src/js/*.js', ['copyJs']);
  // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass']);

  gulp.watch('src/*.html', ['copyHtml']);
  // Watch image files
  gulp.watch(['src/img/**/*.png', 'src/img/**/*.jpg'], ['copyImg']);
});


gulp.task('default', ['sass', 'copyJs', 'copyHtml', 'copyImg', 'watch']);