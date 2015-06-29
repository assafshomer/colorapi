var bitcoin = require('bitcoinjs-lib');
var request = require('request');
address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
key = bitcoin.ECKey.makeRandom();
new_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+new_address+']');

function postToApi(api_endpoint, json_data, callback) {
	console.log(api_endpoint+': ', JSON.stringify(json_data));
	request.post({
		url: 'http://api.coloredcoins.org:80/v2/'+api_endpoint,
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
     ],
    "metadata": {
        "userData": {
            "ID": "test ID",
            "Name": "new asset name",
            "Description": "this asset is going to be transferred on issuance",
            "Type": "movie ticket"
        }
    }
};

postToApi('issue', asset, function(err, body){
    if (err) {
        consule.log('error: ', err);
    }
});

/*
Body:  "{\"txHex\":\"01000000015d936ddcce4f77ba6efb5e8cea6b48ee86021150af4df94089bc438df1de75290100000000ffffffff04580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff210379755f244b2dac2c21006df137bf3be5f70e4aa111a82c9abbbd7191c1479f6452ae58020000000000001976a9141fbdbd176079a667572cc875f5a4e11ba42f89d988ac0000000000000000206a1e434301024560894f82c4b640212c87f48561e0fcb703de0027b001221010087e0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000\",\"assetId\":\"Lb9W5W5EFHhXK5Uv9rcMRvPV9WzJyPxpFP\"}"

Signed: 01000000015d936ddcce4f77ba6efb5e8cea6b48ee86021150af4df94089bc438df1de7529010000006a4730440220573fc8fbe72fab1c9b4036fdd724d75c3c4836c76cbf6d96dfbe2c5f330d3a950220585eb81f8f693c10fde578eba68cc0706b1333b6150e167824e065d634a128fe012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff04580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff210379755f244b2dac2c21006df137bf3be5f70e4aa111a82c9abbbd7191c1479f6452ae58020000000000001976a9141fbdbd176079a667572cc875f5a4e11ba42f89d988ac0000000000000000206a1e434301024560894f82c4b640212c87f48561e0fcb703de0027b001221010087e0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000


*/