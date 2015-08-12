module.exports = function(){ 
    var path = require('path');
    var scriptName = path.basename(__filename,'.js');
    var log_file_name = scriptName+'_'+Date.now()+'.json';    

    this.randomHex = function randomHex(length){
    	var init = Array(length).join("x");
    	result = init.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
        });
    	return result;
    };

    this.randomString = function randomString(length)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        l = length || 10
        for( var i=0; i < l; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.randomUpcase = function randomUpcase(length)
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        l = length || 10
        for( var i=0; i < l; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.randomDowncase = function randomDowncase(length)
    {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        l = length || 10
        for( var i=0; i < l; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.randomInteger = function randomInteger(length)
    {
        var text = "";
        var possible = "0123456789";
        l = length || 10
        for( var i=0; i < l; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    this.logFileName = function logFileName(filename){
        return path.basename(__filename,'.js')+'_'+Date.now()+'.json'; ;
    }
}