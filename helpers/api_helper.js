var request = require('request');
var fs = require('fs');


module.exports = function(){ 

this.network = 'testnet';
var prefix = (network=='bitcoin')?'':'testnet.';
var root = 'http://'+prefix+'api.coloredcoins.org:80/v2/';

this.postToApi = function postToApi(api_endpoint, json_data, callback) {
	// console.log(api_endpoint+': ', JSON.stringify(json_data));
	console.log('Post to:'+root+api_endpoint+'/'+JSON.stringify(json_data));
	var log_file_name = api_endpoint+'_'+Date.now()+'.json';
	request.post({
		url: root+api_endpoint,
		headers: {'Content-Type': 'application/json'},
		form: json_data
	}, 
	function (error, response, body) {
		if (error) {
			return callback(error);
		}
		if (typeof body === String) {
			body = JSON.parse(body);
		}
		console.log('Status: ', response.statusCode);
		console.log('Body: ', JSON.stringify(body));
		fs.writeFile('../log/'+log_file_name, body, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The reply was saved to the log file ["+ log_file_name+"]");
		});		
		return callback(null, body, log_file_name);
	});
};

this.getFromApi = function getFromApi(api_endpoint, data, callback) {
	console.log('Get from:'+root+api_endpoint+'/'+data);
	var log_file_name = api_endpoint+'_'+Date.now()+'.json';
	request.get(root+api_endpoint+'/'+data, function (error, response, body) {
	    if (error) {
	        return callback(error);
	    }

	    if (typeof body === String) {
	        body = JSON.parse(body);
	    }
	    console.log('Status:', response.statusCode);	    
	    console.log('Body:', body);	    
			fs.writeFile('../log/'+log_file_name, body, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("The reply was saved to the log file ["+ log_file_name+"]");
			});
			return callback(null, body,log_file_name);	  
	});
};

}