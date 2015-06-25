var bitcoin = require('bitcoinjs-lib');
var request = require('request');

module.exports = {




function postToApi(api_endpoint, json_data, callback) {
	console.log(api_endpoint+': ', JSON.stringify(json_data));
	request.post({
		url: 'http://api.coloredcoins.org:80/v2/'+api_endpoint,
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
		return callback(null, body);
	});
};

function getFromApi(api_endpoint, data, callback) {
	console.log('Get from:'+api_endpoint+'/', data);
	request.get('http://api.coloredcoins.org:80/v2/'+api_endpoint+'/'+data, function (error, response, body) {
	    if (error) {
	        return callback(error);
	    }

	    if (typeof body === String) {
	        body = JSON.parse(body);
	    }
	    console.log('Status:', response.statusCode);
	    console.log('Headers:', JSON.stringify(response.headers));
	    console.log('Body:', body);
	  
	});
};

}
