/**
 * Created by ALI on 5/22/2017.
 */
'use strict';
var gulp = require('gulp');
var lesscss = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

gulp.task('serve', ['less'], function () {
    browserSync.init({
        server: 'app'
    });
    gulp.watch("app/less/**/*.less", ['less']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('less', function () {
    return gulp.src("app/less/style.less")
        .pipe(plumber())
        .pipe(lesscss())
        .pipe(postcss([
                autoprefixer({
                    browsers: [
                        "last 5 version",
                        "last 5 Chrome versions",
                        "last 5 Firefox versions",
                        "last 5 Opera versions",
                        "last 5 Edge versions"
                    ]
                })
            ]
        ))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('deploy', function () {
    return gulp.src('/**/*', {cwd: buildPath})
        .pipe(gh_pages())
});
