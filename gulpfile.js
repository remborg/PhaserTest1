var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
// var livereload = require('gulp-livereload');

var server = require('gulp-server-livereload');



var sass = require('gulp-ruby-sass');
gulp.task('sass', function() {
    return sass('src/scss/style.scss', {style: 'compressed'})
        .pipe(gulp.dest('build/css/'))
        // .pipe(server({ livereload: true, directoryListing: true, open: true }));
});

gulp.task('copyJs', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('build/js/'))
        // .pipe(server({ livereload: true, directoryListing: true, open: true }));
});
gulp.task('copyHtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build/'))
        // .pipe(server({ livereload: true, directoryListing: true, open: true }));
});
gulp.task('copyImg', function() {
    return gulp.src(['src/img/**/*.png', 'src/img/**/*.jpg'])
        .pipe(gulp.dest('build/img/'))
        // .pipe(server({ livereload: true, directoryListing: true, open: true })); 
});
gulp.task('copySounds', function() {
    return gulp.src(['src/sounds/**/*'])
        .pipe(gulp.dest('build/sounds/'))
        // .pipe(server({ livereload: true, directoryListing: true, open: true })); 
});

gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('src/js/*.js', ['copyJs']);
  // Watch .scss files
  gulp.watch('src/scss/*.scss', ['sass']);

  gulp.watch('src/*.html', ['copyHtml']);
  // Watch image files
  gulp.watch(['src/img/**/*.png', 'src/img/**/*.jpg'], ['copyImg']);
  gulp.watch(['src/sounds/**/*'], ['copySounds']);

gulp.src('build')
    .pipe(server({
      livereload: true,
      // directoryListing: true,
      open: true,
      host: "0.0.0.0"
      // livereload: {	port: 35728}
    }));
});

// gulp.task('livereload', function() {
//   gulp.src('build')
//     .pipe(server({
//       livereload: true,
//       // directoryListing: true,
//       open: true,
//       // livereload: {	port: 35728}
//     }));
// });


gulp.task('default', ['sass', 'copyJs', 'copyHtml', 'copyImg', 'copySounds', 'watch']);
// gulp.task('bootrun', ['livereload']);