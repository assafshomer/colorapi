// transfer.js
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
Body:  {"txHex":"01000000014f804699959161559b2130bbc37937bf11fe32de69fd0e349359509f3c3a5f160100000000ffffffff020000000000000000096a0743430105201210583e0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","assetId":"LCfTHGbuNHRU6ghCgBrAkAbk4He7RfYmDqYW7"}
*/