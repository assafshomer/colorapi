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
var signedTxHex= '010000000121175a1b9f709e151cd19aefaa95a77da681ff6b87371a755d9c9182feaf2370010000006b48304502210089360de91df17746b71ebd35d5bbffd13a00bc192be459c8efb01c18d932bc7202201db8892673d25806de94d820ae9551eadf946bda314b58829cd1084f57498cc0012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff0358020000000000001976a914ca259a5ff555ebe8c145dc5fb963a62766f033c488ac00000000000000000c6a0a4343010527b000221010767f0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var transaction = {
    'txHex': signedTxHex
};

postToApi('broadcast', transaction, function(err, body){
    if (err) {
        consule.log('error: ', err);
    }
});

/*
Body:  "{\"txid\":\"8dd4006e9275085140aa3a2a9f7b3c1b593847c22b3338332da9e4ec03a84e51\"}"
*/