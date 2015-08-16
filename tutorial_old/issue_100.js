// issue_100.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
funded_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR'; // or your own funded address
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
var asset = {
    'issueAddress': funded_address,
    'amount': 100,
    'fee': 1000
};
postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
Body:  {"txHex":"01000000016605218c2217f94db9490cc242fbaa98125d52975f9690d3433b1bde88b4b6020100000000ffffffff020000000000000000096a074343010520121018ddf505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","assetId":"LKXjG9uMSFoDj2Z6NrEJ6nkcRGVtjUmC4zrtH"}
*/