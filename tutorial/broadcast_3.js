// broadcast.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
function postToApi(api_endpoint, json_data, callback) {
	console.log(api_endpoint+': ', JSON.stringify(json_data));
	request.post({
		url: 'http://testnet.api.coloredcoins.org:80/v2/'+api_endpoint,
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
var signedTxHex= '01000000016605218c2217f94db9490cc242fbaa98125d52975f9690d3433b1bde88b4b602010000006b483045022100d1f8c27274328498453cb1afd348a835ebbe31b585c81550089729cb1e1d97a502200864c045789ef02e8a57f616d3b9deeb044fcb2771a44cca104a4515ab3e6327012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff020000000000000000096a074343010520121018ddf505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var transaction = {
    'txHex': signedTxHex
};
postToApi('broadcast', transaction, function(err, body){
    if (err) {
        consule.log('error: ', err);
    }
});

/*
Body:  "{\"txid\":\"ffd4d9de2b5f428ab9c933f5dd65793f00ef6202631f8bac50c571a99db1ae7a\"}"
*/
