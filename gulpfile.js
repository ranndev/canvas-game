const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

// Server
gulp.task('browser-sync', () => {
	browserSync.init({
		server: { baseDir: './' }
	});
});

// Stylesheets
gulp.task('styles', () => {
  return gulp.src("scss/**/*.scss")
  	.pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', () => {
  return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['env'] }))
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('default', ['styles', 'scripts', 'browser-sync'], () => {
  gulp.task('scripts-watch', ['scripts'], done => {
    browserSync.reload();
    done();
  });

  // Watch
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['scripts-watch']);
  gulp.watch('index.html').on('change', browserSync.reload);
});

