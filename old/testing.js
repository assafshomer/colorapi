var bitcoin = require('bitcoinjs-lib');
var request = require('request');

key = bitcoin.ECKey.makeRandom()
wif = key.toWIF();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();

console.log('new bitcoin address: ['+address+']');
console.log('Private Key of new address: ['+wif+']');

var data = {
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

console.log("data:" +JSON.stringify(data));

function call_api(api_endpoint,json_data) {
	request.post({
	  url: 'http://api.coloredcoins.org:80/v2/'+api_endpoint,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  form: json_data
	}, function (error, response, body) {

	  if (typeof body === String) {
	    body = JSON.parse(body);
	  }
	  console.log('Status: ', response.statusCode);
	  console.log('Headers: ', JSON.stringify(response.headers));
	  console.log('Body: ', JSON.stringify(body));
	});	
}

call_api('issue',data);





