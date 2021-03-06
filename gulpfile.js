var gulp = require('gulp');
var inject = require('gulp-inject');
var babel = require("gulp-babel");var annotate = require('gulp-ng-annotate');
var less = require('gulp-less');
var es = require('event-stream');

gulp.task('scripts', function () {
    var javascripts = gulp.src('./src/**/*.js')
        .pipe(babel({auxiliaryCommentBefore: "istanbul ignore next"}));


    es.merge(javascripts)
        .pipe(annotate())
        .pipe(gulp.dest('./build'));
});

gulp.task('styles', function() {
    return gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('./build'));
});

gulp.task('templates', function() {
    return gulp.src('./src/**/*.tpl.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('index', ['scripts', 'styles', 'templates'], function() {

    var target = gulp.src('./src/index.html');

    var js = gulp.src([
        '../bower_components/angular/angular.js',
        'app/utils/register.js',
        'app/app.js',
        '**/!(app.js)'
    ], {read: false, cwd: './build/'});

    var css = gulp.src([
        'styles/main.css'
    ], {read: false, cwd: './build/'});

    target
        .pipe(inject(js, { addRootSlash: false }))
        .pipe(inject(css, { addRootSlash: false }))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['index'], function () {

    gulp.watch(['./src/**/*.js', './src/**/*.ts'], ['scripts']);
    gulp.watch('./src/**/*.less', ['styles']);
    gulp.watch('./src/**/*.tpl.html', ['templates']);
    gulp.watch('./src/index.html', ['index']);

});


gulp.task('default', ['index']);