// asset_metadata.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
function getFromApi(api_endpoint, param, callback) {
	console.log('Get from:'+api_endpoint+'/'+param);
	request.get('http://api.coloredcoins.org:80/v2/'+api_endpoint+'/'+param, function (error, response, body) {
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

assetid = 'Lb9W5W5EFHhXK5Uv9rcMRvPV9WzJyPxpFP';
txid='2ea25d59979e35aec53037b2bf47014f21358f550c8ef290e04249b152ba3de5';
index = '1';

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});