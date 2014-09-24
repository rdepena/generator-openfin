/* jshint node: true */

'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay'),
    fs = require('fs'),
    rvmDownloader = require('./rvm-downloader'),
    myPromts = {
        "description": "a OpenFin POC Application",
        "name": "OpenFinPOC"
    },
    rvmDownloadUrl = 'https://developer.openfin.co/release/rvm/latest';
var OpenfinGeneratorGenerator = yeoman.generators.Base.extend({
    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the OpenFin generator!'
        ));

        var prompts = [{
            name: 'name',
            message: 'Pick a name, no spaces'
        }, {
            name: 'description',
            message: 'A description of your package'
        }];

        this.prompt(prompts, function(props) {
            myPromts.description = props.description;
            myPromts.name = props.name;

            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.dest.mkdir('public');
            this.dest.mkdir('public/css');
            this.dest.mkdir('public/js');

            //root app files
            this.src.copy('_gruntfile.js', 'gruntfile.js');
            this.src.copy('_bower.json', 'bower.json');
            this.src.copy('_.bowerrc', '.bowerrc');
            this.src.copy('_package.json', 'package.json');

            //root src files
            this.src.copy('src/launcher.js', 'src/launcher.js');

            //public root files
            this.src.copy('public/index.html', 'public/index.html');
            this.src.copy('public/404.html', 'public/404.html');
            this.src.copy('public/app.json', 'public/app.json');
            this.src.copy('public/favicon.ico', 'public/favicon.ico');

            //public css files
            this.src.copy('public/css/main.css', 'public/css/main.css');
            this.src.copy('public/css/bootstrap.min.css', 'public/css/bootstrap.min.css');

            //public js files
            this.src.copy('public/js/main.js', 'public/js/main.js');
        },

        projectfiles: function() {
            this.src.copy('editorconfig', '.editorconfig');
            this.src.copy('jshintrc', '.jshintrc');
        }
    },

    end: function() {
        //update package.json with user propmts
        fs.readFile('package.json', function(err, data) {
            if (err) {
                throw err;
            }
            var pack = JSON.parse(data);

            for (var opt in myPromts) {
                pack[opt] = myPromts[opt];
            }
            fs.writeFile('package.json', JSON.stringify(pack, null, " "), function(err) {
                if (err) throw err;
                console.log('package.json formatted');
            });
        });
        //update app.json with user propmts
        fs.readFile('public/app.json', function(err, data) {
            if (err) {
                throw err;
            }
            var appConfig = JSON.parse(data);

            //extend the app.config file with user prompts.
            appConfig.startup_app.name = myPromts.name;
            appConfig.startup_app.uuid = myPromts.name;
            appConfig.shortcut.name = myPromts.name;
            appConfig.shortcut.description = myPromts.description;

            fs.writeFile('public/app.json', JSON.stringify(appConfig, null, " "), function(err) {
                if (err) throw err;
                console.log('public/app.json formatted');
            });
        });

        //we are done, install any dependencies.
        this.installDependencies();

        //download the rmv
        rvmDownloader.download(rvmDownloadUrl, function() {
            console.log('RVM Ready to be used.');
        });
    }
});

module.exports = OpenfinGeneratorGenerator;
