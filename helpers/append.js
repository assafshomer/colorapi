var fs = require('fs');
body=Date.now();
fs.appendFile('../log/foo.txt', body+'\n', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Saved to the log file [foo.txt]");
});	