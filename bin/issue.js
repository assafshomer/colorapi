var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var fs = require('fs');

key = bitcoin.ECKey.makeRandom();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();

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

var asset = {
    "issueAddress": address,
    "amount": 1,
    "fee": 1000,
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