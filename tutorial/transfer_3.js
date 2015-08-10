var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
var key = bitcoin.ECKey.makeRandom();
var to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+to_address+']');

var asset = {
    'from': issuance_address,       
    'fee': 1000,
    'to': [{
        'address': to_address,
        'amount': 5,
        'assetId': 'LKXjG9uMSFoDj2Z6NrEJ6nkcRGVtjUmC4zrtH'
    }]
};

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
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};

postToApi('sendasset', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});