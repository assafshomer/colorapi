// asset_metadata.js
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

assetid = 'LFz41uCdFzCFwMfYHEpjDQLc9Erpk6dhE7VGW';
txid='b48b266f8da4b3a97a3680da0dd584fd82d6d1cc0c8aa199aa1be7c888b4ff66';
index = '2';

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});