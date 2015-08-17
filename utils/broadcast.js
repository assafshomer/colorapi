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
var signedTxHex= '0100000001d6db272b09510fa373ff87f84c3648cb25028501adfe754b34d02a10f5bbbca600000000fdfd0000483045022100f4e3cbf5c44e24ff932e5c5a1988044f43063f059175b680db2043336d1c1f89022021084268827a0a0e77bcefbc6be6f14aa310c608f04f31ea710f345577b153930147304402204274e6d7caeaa7096bea4ae070ffb835f5e8a3ce61a126d31dadc70cd12c3ed4022067088cef2ea728df83a1c043c596fdfff61abe47149efc3895e3d07083f32a17014c69522103ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2210352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946210330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b53aeffffffff020000000000000000096a074343010527b010ce8101000000000017a9141442dada3e43b037543440bad2ad9695a360a6558700000000';
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
