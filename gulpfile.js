const gulp = require('gulp')
const less = require('gulp-less')
const watch = require('gulp-watch')

gulp.task('less-compile', () => {
    return gulp.src('./public/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./public/css/'))
})

gulp.task('watch', () => {
    gulp.watch('./public/less/**/*.less', gulp.series('less-compile'))
})