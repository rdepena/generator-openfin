/* jshint node: true*/
'use strict';
module.exports = function(grunt) {
    var files = {
        js: [
            'gruntfile.js',
            'public/**/*.js',
            'public/**/*.json',
            '*.json'
        ],
        html: [
            'public/**/*.html'
        ],
        css: [
            'public/**/*.css'
        ]
    };

    grunt.initConfig({
        watch: {
            code: {
                files: [].concat(files.html, files.css, files.js),
                tasks: ['default'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'public'
                    ]
                },
                files: [].concat(files.html, files.css, files.js)
            }
        },
        jshint: {
            jsFiles: files.js,
            options: {
                node: false
            }
        },
        jsbeautifier: {
            jsFiles: files.js,
            options: {
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 4,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0
                }
            }
        },
        connect: {
            options: {
                port: process.env.PORT || 5000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: false,
                    base: [
                        'public'
                    ]
                }
            }

        }
    });

    grunt.registerTask('openfin-launcher', 'open fin launcher', function() {
        var launcher = require('./src/launcher');
        //launch openfin.
        launcher.launchOpenfin();
    });

    //modifies the app.config to point to a specific server
    grunt.registerTask('config-builder', 'open fin launcher', function() {
        var configBuilder = require('./src/configBuilder'),
            target = grunt.option('target'),
            //this task is asynchronous.
            done = this.async();

        if (target) {
            //request the config to be updated with a given target and pass the grunt done function.
            configBuilder.build(target, done);
        } else {
            console.log('no target specific, app.json running defaults');
            done();
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'jsbeautifier']);
    grunt.registerTask('test', ['jshint', 'jsbeautifier']);
    grunt.registerTask('serve', ['test', 'config-builder', 'connect:livereload', 'openfin-launcher', 'watch']);
    grunt.registerTask('build', ['test', 'config-builder']);

};
