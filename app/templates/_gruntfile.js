/* jshint node: true*/
'use strict';
module.exports = function(grunt) {
    var files = {
        js: [
            'gruntfile.js',
            'public/**/*.js',
            'public/**/*.json',
            '*.json',
            '!public/bower_components/**/*.js'
        ],
        html: [
            'public/**/*.html'
        ],
        css: [
            'public/**/*.css',
            '!public/bower_components/**/*.css'
        ]
    };

    grunt.initConfig({
        watch: {
            code: {
                files: [
                    files.html.join(','),
                    files.css.join(','),
                    files.js.join(',')
                ],
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
                files: [
                    files.html.join(','),
                    files.css.join(','),
                    files.js.join(',')
                ]
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
                port: 5000,
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['jshint', 'jsbeautifier']);
    grunt.registerTask('test', ['jshint', 'jsbeautifier']);
    grunt.registerTask('serve', ['test', 'connect:livereload', 'openfin-launcher', 'watch']);

};
