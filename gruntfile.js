/* jshint node: true*/
'use strict';
module.exports = function(grunt) {
    var files = {
        js: [
            'gruntfile.js',
            'app/index.js',
            'app/**/*.js',
            'app/**/*.json',
            'package.json'
        ]
    };

    grunt.initConfig({
        watch: {
            js: {
                files: files.js,
                tasks: ['default']
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
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'jsbeautifier']);
    grunt.registerTask('test', ['jshint', 'jsbeautifier', 'mochaTest']);
};
