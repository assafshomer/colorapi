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
var signedTxHex= '0100000001f67da5872cff580fcf0d13f847c29a390e34034d36edef00c5143ccf1273ab95010000006b483045022100dc28f9548d4833246564a58b1214d316a84886f9d321e62de933776cf2c9e73c0220515baadded57370dd0fdafd9368aa3ced0114493804f6c959d17f54672f5bbd7012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff03ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff21033d135d08ade560dc17b00bf1b7c63ea9c5aab4354777be278a6155c1413ed09752ae00000000000000001c6a1a43430102f5e946907c7bf48eb23335caae940cf87e08fb5701100c800100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var transaction = {
    'txHex': signedTxHex
};
postToApi('broadcast', transaction, function(err, body){
    if (err) {
        consule.log('error: ', err);
    }
});

/*
Body:  "{\"txid\":\"597542a478efeeb70f46159ef77aea0d3cc22641d0f9e5ff97af2ca0f844638f\"}"
*/
