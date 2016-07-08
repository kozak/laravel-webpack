var gulp = require('gulp');
var yargs = require('yargs')
    .option({
        'prod': {
            demand: false,
            default: false,
            describe: 'Configures tasks for production',
            type: 'boolean'
        }
    })
    .usage("Usage: $0 <command> [options]")
    .help('h')
    .alias('help')
    .argv;
var gulpIf = require('gulp-if');
var notify = require("gulp-notify");
var livereload = require('gulp-livereload')
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var origin = 'resources/assets/';
var dest = 'public';

gulp.task('default', ()=> {
    var isProd = yargs.prod;
    gulp.task('browserify');
    // gulp.src("resources/assets/sass/app.scss")
    //     .pipe(notify("Hello Gulp!"));
});
gulp.task('watch', ()=> {
    livereload.listen();
    gulp.watch(['resources/assets/sass/**/*.scss'], ['sass']);
    gulp.watch(['resources/assets/js/**/*.js'], ['browserify', 'js']);
});
gulp.task('browserify', ()=> {
    return browserify(origin + 'js/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dest + '/js'))
        .pipe(notify("Done, master!"));
});