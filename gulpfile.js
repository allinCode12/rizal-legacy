const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// Compile SCSS to CSS
function style() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

// Watch task
function watch() {
    style(); // Initial compilation
    browserSync.init({
        server: './',
        notify: false
    });
    
    gulp.watch('scss/**/*.scss', style);
    gulp.watch(['*.html', '*.js']).on('change', browserSync.reload);
}

// Export tasks
exports.style = style;
exports.watch = watch;
exports.default = watch;