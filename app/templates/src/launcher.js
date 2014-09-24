var exec = require('child_process').exec,
    os = require('os'),
    path = require('path');

//this module can run openfin.
module.exports = {
    launchOpenfin: function() {
        //check if we are in windows.
        if (os.type().toLowerCase().indexOf('windows') > -1) {
            //TODO:make this configurable from grunt.
            exec(path.resolve('OpenFinRVM.exe') + ' --config="http://localhost:5000/app.json"', function callback(error, stdout, stderr) {
                console.log('running openfin');
                if (error) {
                    console.error(error);
                }
            });
        } else {
            console.error('non windows, launcher not supported.');
        }
    }
};
