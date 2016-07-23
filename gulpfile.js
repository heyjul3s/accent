(function(){
    'use strict';

    var gulp          = require('gulp'),
        plumber       = require('gulp-plumber'),
        gutil         = require('gulp-util'),

        //HTML
        pug           = require('gulp-pug'),

        //STYLES
        stylus        = require('gulp-stylus'),
        autoprefixer  = require('gulp-autoprefixer'),
        nib           = require('nib'),
        jeet          = require('jeet'),
        rupture       = require('rupture');


    var paths = {
        src : {
            pug: 'index.pug',
            stylus: 'src/**/*.styl'
        },
        dest : {
            html: './',
            css: './dist/'
        }
    };


    gulp.task('pug', function(){
        return gulp.src( paths.src.pug )
            .pipe( plumber() )
            .pipe( pug({
                pretty: true
            }))
            .pipe( gulp.dest( paths.dest.html ) );
    });


    gulp.task('autoprefixer', function(){
        return gulp.src( paths.src.stylus )
            .pipe( plumber() )
            .pipe( autoprefixer([
                'last 2 versions',
                '> 1%',
                'ie 10'
            ]))
            .pipe( gulp.dest(paths.dest.css) );
    });


    gulp.task('stylus', function(){
        return gulp.src( paths.src.stylus )
            .pipe( plumber() )
            .pipe( stylus({
                paths: [
                    './node_modules/../',
                    // './node_modules/rupture',
                    // './node_modules/jeet/stylus/jeet',
                    // './node_modules/nib',
                    paths.src.stylus
                ],

                use: [
                    nib(),
                    rupture(),
                    jeet()
                ],

                'include css': true

            }))
            .pipe( autoprefixer() )
            .pipe( gulp.dest( paths.dest.css ) );
    });


    gulp.task('watch', function() {
        gulp.watch( paths.src.pug, [
            'pug',
        ]);

        gulp.watch( paths.src.stylus, [
            'stylus'
        ]);
    });


    gulp.task('default', [
        'watch'
    ]);
}());
