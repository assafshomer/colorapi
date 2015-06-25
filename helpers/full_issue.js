var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var open = require('open');

key = bitcoin.ECKey.makeRandom();
wif = key.toWIF();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+address+']');
console.log('key: ['+wif+']');

amount = 0.01;
wait_milis = 60000;

open(qr_url(address,amount));

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

setTimeout(function(){
	postToApi('issue',asset,function(err, body){
	  if (err) consule.log('error: '+err);
	});
}, wait_milis);



function qr_url(address,bitcoin_amount) {
  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=bitcoin:'+address+'?amount='+bitcoin_amount;	
}


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