// transfer_asset.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');

from_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

key = bitcoin.ECKey.makeRandom();
to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+to_address+']');

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
	"from": from_address,		
    "fee": 1000,
    "to": [{
    	"address": to_address,
    	"amount": 5,
    	"assetId": 'Lb9W5W5EFHhXK5Uv9rcMRvPV9WzJyPxpFP'
    }]
};

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

