// transfer_pubkeys_multisig.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
require('../helpers/address_helper.js')();
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

// var pubKeys = [bitcoin.ECKey.makeRandom().pub.toHex(),bitcoin.ECKey.makeRandom().pub.toHex(),bitcoin.ECKey.makeRandom().pub.toHex()];

pubKeys = [ '03ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2',
  '0352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946',
  '0330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b' ]

var m =2;
var send_asset = {
    from: issuance_address,
    to: [{
        pubKeys:pubKeys,
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
sendasset:  {"from":"n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR","to":[{"pubKeys":["03ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2","0352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946","0330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b"],"m":2,"amount":10,"assetId":"LGGxrFrEE2MhYoDrqzuXXg136rRY6mHScFshW"}],"fee":1000}
Status:  200
Body:  {"txHex":"0100000001818ee20e62fb52f1bac564f85f468a94538bfe62aea3e7f1bea71e39540bc3cf0200000000ffffffff03580200000000000017a9141442dada3e43b037543440bad2ad9695a360a655870000000000000000086a0643430115000a4c6d0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","multisigOutputs":[{"index":0,"reedemScript":"522103ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2210352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946210330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b53ae","address":"2Mu6MbHBxSpD2CLDpQRATKf3X8L4TSapmV9"}]}


Body:  "{\"txid\":\"3ac2a9a0c29884bd497a411ebaee35409f534f0fa2232907961ed44e728ea0e5\"}"
*/