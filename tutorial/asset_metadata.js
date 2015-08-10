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

assetid = 'LCNeqPsxVSXZEZa6gm84s9pj885FTb27nEfJB';
txid='f36bb85d9f9819620c7eb0efe3af8ce8cdf1e5317cac96afd806fecfcae08acd';
index = '2';

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});