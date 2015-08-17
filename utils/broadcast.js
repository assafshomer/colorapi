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
var signedTxHex= '010000000173044e4c41d8f058c4fd31a8d67733908f617eb93fe792378e6615f45358729f010000006b483045022100b2238e1628e9ee612bcd7a5ed641ed6f4b12b7ddd1b74b007ea2c5efc8a31e570220515233cc42268d71f922d4b9b057315ce24d1bfe9fd2d6a30b9b5213f10104d2012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff03ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103e339927c047b00d57cea117b39b163c8bc14dfd852a1acfa6adcef50bf08d0e252ae00000000000000001d6a1b43430102c31c5f8505bde610b1fbf1634fa986410aa7064a2051100c800100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
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
