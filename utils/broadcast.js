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
var signedTxHex= '0100000002d640951d8baed329585df5cd4f2999e9ddf584b1342829e0395f1da8e1e8c605020000006b483045022100d31ef5548187fbb38e0293b3f8f115b5404e1d9c18c35f517090d382635ac01402202910e25870a5106309800f01aa8e097840a8ef8d03b076fa8e3fad755c6ad173012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff0cfff4787c44415aec5ba03ee72884329229972037c7b48785d11860fedec5fe000000006b4830450221008a6b972f6a3ee10075a43250de78eaa0e3cb668c4866a9c29468cfaf7da3430102207b76fac195cc77ca9af434c21d5f523096ae04324b189c46a48a10746869f5dc012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff05ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103f3f19042caf1083a531e11c45b7471a31ba00a71ba31a05a93cbeb4e611b6bcc52ae58020000000000001976a914246a3621dae93a71eacde3f994a31932f564468388ac58020000000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000000000001e6a1c434301119731b8cc2bae95fa14df0ba22a62f6e63036a17101020203b47d0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
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
