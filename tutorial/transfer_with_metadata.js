// transfer_with_metadata.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
var key = bitcoin.ECKey.makeRandom();
var to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
var send_asset = {
    from: issuance_address,
    to: [{
        address: to_address,
        amount: 10,
        assetId: 'LEjtW9dppmaqEEibUVKSY1uAoZCfXP1TDierE'
    }],
    fee: 1000,    
    metadata:  { assetName: 'laboris',
      issuer: 'anim nisi consectetur',
      description: 'Fugiat ipsum sunt amet reprehenderit irure.',
      urls: 
       [ { name: 'magna',
           url: 'http://D7I.com',
           mimeType: 'text/html',
           dataHash: '637b7a78fa119d05bde3765ac40c72d22906da7977640a79d11a291a73c9549' },
         { name: 'do',
           url: 'http://2mz.com',
           mimeType: 'text/html',
           dataHash: 'd71ce3f84ff0a6fe78ce6448c995af6c530b7dfbdd6c5ac19b79e02183b17ab' },
         { name: 'et',
           url: 'http://MLy.com',
           mimeType: 'text/html',
           dataHash: '1d736e670a061362b2d4ddc632ed5fe40d5554dabc8395d311f076a13848d16' } ],
      userData: 
       { meta: 
          [ { key: 'reprehenderit', value: '78584', type: 'Number' },
            { key: 'culpa', value: 'Pg2sxqj6CX', type: 'String' },
            { key: 'duis', value: true, type: 'Boolean' } ],
         fookey: 'fBRiImkkFZdDt0ILvX8qJ7UmAllO8p',
         barkey: '3081468253' } }
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