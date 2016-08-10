"use strict"

var gulp = require('gulp');
var shell = require('gulp-shell');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var pump = require('pump');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var gulpif = require('gulp-if');

// default paths
var paths = {
    sass: 'resources/assets/sass/',
    js: 'resources/assets/js/',
    public: 'public/assets/',
    artisan: '../../../artisan'
}

var makeSass = function (src, dst) {
    gulp.src(paths.sass + src)
        .pipe(sass({
            outputStyle: util.env.production ? 'compressed' : 'expanded'
        }).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(rename(dst))
        .pipe(gulp.dest(paths.public + 'styles'));
};

var makeAngular = function (src, dst, cb) {
    var source = gulp.src(paths.js + src)
        .pipe(concat(dst))
        .pipe(gulpif(util.env.production, ngAnnotate()));
    pump([
        source,
        gulpif(util.env.production, uglify()),
        gulp.dest(paths.public + 'scripts')
    ], cb);
};

var publish = function (provider) {
    return function () {
        gulp.src('').pipe(shell('php ' + paths.artisan + ' vendor:publish --provider="' + provider + '" --force'));
    };
};

module.exports = {
    paths,
    sass: makeSass,
    angular: makeAngular,
    publish
};
