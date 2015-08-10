var bitcoin = require('bitcoinjs-lib');
var request = require('request');
address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
key = bitcoin.ECKey.makeRandom();
new_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+new_address+']');

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

var asset = {
    "issueAddress": address,
    "amount": 123,
    "fee": 1234,
    "transfer":[
       {"address":new_address,"amount": 33}
     ]
};

postToApi('issue', asset, function(err, body){
    if (err) {
        consule.log('error: ', err);
    }
});

/*
Body:  "{\"txHex\":\"01000000011fc40634d28ba68319d87c3a0b754fba05baa2386fdcb50a73b5d9151f46c6d80000000000ffffffff0358020000000000001976a914b0ffe61e2a6daa62accc1a04e053da8e59b851a588ac00000000000000000c6a0a4343010527b000221010d6d9f505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000\",\"assetId\":\"LKafUov95685QJ13FbwbDW6WmYExqXixankWC\"}"
*/