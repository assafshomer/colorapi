// transfer_pubkeys_multisig.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
require('../helpers/address_helper.js')();
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
var key = bitcoin.ECKey.makeRandom();
var to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
var send_asset = {
    from: issuance_address,
    to: [{
        pubKeys:manyKeyPairs(3)['pubkeys'],
        m:2,
        amount: 10,
        assetId: 'LGGxrFrEE2MhYoDrqzuXXg136rRY6mHScFshW'
    }],
    fee: 1000
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
postToApi('sendasset', send_asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
sendasset:  {"from":"n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR","to":[{"pubKeys":["03b21d4d29e9874623b0d009aecde42d4d967c543664f20fe2f390ad54b4bf003d","033e10ba619f62d08ace7502012b1b1f076015211e88f58aec3b46363ca662e2e9","030022f1d3edb79bdcc534181ebf4c33291d90ced9e9c57151616208c4ae96c941"],"m":2,"amount":10,"assetId":"LGGxrFrEE2MhYoDrqzuXXg136rRY6mHScFshW"}],"fee":1000}
Status:  200
Body:  {"txHex":"01000000010bbb83c6183e96b0df1e2192036cfa598ae6b1cfe8f16dff7cea14069e30d43d0200000000ffffffff03580200000000000017a91472f70e70b455f040939a384b049e84282132710a870000000000000000086a0643430115000a8c730100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","multisigOutputs":[{"index":0,"reedemScript":"522103b21d4d29e9874623b0d009aecde42d4d967c543664f20fe2f390ad54b4bf003d21033e10ba619f62d08ace7502012b1b1f076015211e88f58aec3b46363ca662e2e921030022f1d3edb79bdcc534181ebf4c33291d90ced9e9c57151616208c4ae96c94153ae","address":"2N3j6yw3xgQjGsXpibiPKVSsLav9i2zoUpY"}]}

Body:  "{\"txid\":\"cfc30b54391ea7bef1e7a3ae62fe8b53948a465ff864c5baf152fb620ee28e81\"}"
*/