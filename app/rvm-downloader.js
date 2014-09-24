var https = require('https'),
    path = require('path'),
    unzip = require('unzip');

var download = function(url, callback) {
    https.get(url, function(response) {
        response.pipe(unzip.Extract({
            path: path.resolve()
        })).on('close', function() {
            console.log('response pipe done');
            if (callback) {
                callback();
            }
        });
    });
};

module.exports = {
    download: download
};
