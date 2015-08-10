// asset_holders.js
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

assetid='LKXjG9uMSFoDj2Z6NrEJ6nkcRGVtjUmC4zrtH'

getFromApi('stakeholders',assetid,function(err, body){
  if (err) consule.log('error: ', err);
});