// query_address.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
function getFromApi(api_endpoint, param, callback) {
	console.log('Get from:'+api_endpoint+'/'+param);
	request.get('http://testnet.api.coloredcoins.org:80/v2/'+api_endpoint+'/'+param, function (error, response, body) {
	    if (error) {
	        return callback(error);
	    }
	    if (typeof body === String) {
	        body = JSON.parse(body);
	    }
	    console.log('Status:', response.statusCode);
	    console.log('Body:', body);
	    return callback(null, body);
	});
};
address='miQnYGkmPZ5yne2S2n3UibxZLcAhMhNCAL';
getFromApi('addressinfo',address,function(err, body){
  if (err) consule.log('error: ', err);
});