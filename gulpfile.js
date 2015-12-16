var gulp = require('gulp'),
    sass = require('gulp-sass'),
    lost = require('lost'),
    nano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel');

// Sass
gulp.task('sass', function () {
  return gulp.src('app/assets/sass/**/*.scss')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false}))
    .pipe(postcss([
      lost()
    ]))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(nano())
    .pipe(gulp.dest('./app/assets/css'));
});

// Babel.js
gulp.task('babel', () => {
    return gulp.src('app/assets/src/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('app/assets/js'));
});

gulp.task('watch', function () {
  gulp.watch('app/assets/sass/**/*.scss', ['sass']),
  gulp.watch('app/assets/src/**/*.js', ['babel']);
});

// BrowserSync
gulp.task('serve', ['browser-sync', 'watch']);

gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/assets/css/**/*.css',
      'app/assets/imgs/**/*.png',
      'app/assets/js/**/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './app'
      }
   });
});

gulp.task('default', ['serve']);
