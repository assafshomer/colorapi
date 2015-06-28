var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var fs = require('fs');

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
		fs.writeFile('../log/'+api_endpoint+'_'+Date.now()+'.json', body, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The file was saved!");
		});				
		return callback(null, body);
	});
};


var signedTxHex= '0100000001fa9e0775c969fe34b612b8008ac512d93a71196e59fb6366cf3ce42f227187df000000006b483045022100e10eb5986f34d41efbc20e9454fbbaf505fd82744c9aa5e49a5789cd09d16cc802203b36abe0b8c0ab091207dfa94c240e2c74d840ee98990b333b15168d34ec5f95012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110003c0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000'
;

var data_params = {
	'txHex': signedTxHex
};

console.log("signed: "+signedTxHex)

postToApi('broadcast',data_params,function(err, body){
	if (err) consule.log('error: '+err);
});


/*
broadcast:  {"txHex":"0100000001fa9e0775c969fe34b612b8008ac512d93a71196e59fb6366cf3ce42f227187df000000006b483045022100e10eb5986f34d41efbc20e9454fbbaf505fd82744c9aa5e49a5789cd09d16cc802203b36abe0b8c0ab091207dfa94c240e2c74d840ee98990b333b15168d34ec5f95012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110003c0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000"}
Status:  200
Body:  "{\"txid\":\"8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076\"}"
*/