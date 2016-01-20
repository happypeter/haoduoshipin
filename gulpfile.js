var path = require('path');
var swig = require('gulp-swig');
var data = require('gulp-data');
var browserSync = require('browser-sync');
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var wrap = require('gulp-wrap');
var sass        = require('gulp-sass');
//var prefix      = require('gulp-autoprefixer');


var getJsonData = function(file) {
  return require('./src/json/' + path.basename(file.path).replace(/html$/, 'json'));
};

gulp.task('build-html', function () {
    return gulp.src('src/md/**/*.md')
        .pipe(markdown())
        .pipe(wrap({src: 'src/layout/default.html'}))
        .pipe(data(getJsonData))
        .pipe(swig({defaults: { cache: false }}))
        .pipe(gulp.dest('dist'));
});



function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}


gulp.task('sass', function () {
    return gulp.src('src/style/main.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        })) .on('error', handleError)
        //.pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/style'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('cp-assets', function () {
    return gulp.src('src/assets/**/*')
        .pipe(gulp.dest('dist/'));
});

gulp.task('rebuild', ['build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'cp-assets', 'build'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});


gulp.task('watch', function () {
    gulp.watch(['src/md/**/*.md', 'src/layout/*.html'], ['rebuild']);
    gulp.watch(['src/style/*'], ['sass']);
});

gulp.task('build', ['build-html','sass', 'cp-assets']);
gulp.task('default', ['browser-sync','watch']);
