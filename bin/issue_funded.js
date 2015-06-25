var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var fs = require('fs');

address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

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
		fs.writeFile('./log/'+api_endpoint+'_'+Date.now()+'.json', body, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    console.log("The file was saved!");
		});		
		return callback(null, body);
	});
};

var asset = {
    "issueAddress": address,
    "amount": 123,
    "divisibility": 0,
    "fee": 1234,
    "transfer": [{
    	"address": address,
    	"amount": 1
    }],
    "metadata": {
        "userData": {
            "ID": "ID",
            "Name": "AssetName",
            "Description": "AssetDescription",
            "Type": "AssetType"
        }
    }
};

postToApi('issue',asset,function(err, body){
  if (err) consule.log('error: '+err);
});

/*
Status:  200
Body:  "{\"txHex\":\"0100000001fa9e0775c969fe34b612b8008ac512d93a71196e59fb6366cf3ce42f227187df0000000000ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110003c0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000\",\"assetId\":\"LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ\"}"

*/