// transfer.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
var key = bitcoin.ECKey.makeRandom();
var assetId = 'LFz41uCdFzCFwMfYHEpjDQLc9Erpk6dhE7VGW'
var to_address = key.pub.getAddress(bitcoin.networks.testnet).toString();
var send_asset = {
    from: issuance_address,
    to: [{
        address: to_address,
        amount: 2,
        assetId: assetId
    },
    {
        address: issuance_address,
        amount: 3,
        assetId: assetId
    }],    
    amount: 10,
    fee: 1000,    
    metadata:  { assetName: 'reprehenderit',
      issuer: 'irure labore aliquip',
      description: 'Deserunt ad deserunt veniam quis non nulla eu excepteur cillum excepteur deserunt aliqua velit.',
      urls: 
       [ { name: 'sit',
           url: 'http://S1U.com',
           mimeType: 'text/html',
           dataHash: 'fc351c36634a8fe2048a4af84a8e624f7b8f2b92d8d0d525b7cdc236947ad19' },
         { name: 'id',
           url: 'http://6U1.com',
           mimeType: 'text/html',
           dataHash: 'ef0d83d541a94d6258b2db4e27a1f5e62e6f22f8073663e4eb2a8f336c40eda' },
         { name: 'tempor',
           url: 'http://l5y.com',
           mimeType: 'text/html',
           dataHash: '164e645fbf5fa404ca1cb571e59608f841fda357a073844939f39192d21b50c' } ],
      userData: 
       { meta: 
          [ { key: 'nisi', value: '41406', type: 'Number' },
            { key: 'laborum', value: 'v0ggjkEJpV', type: 'String' },
            { key: 'incididunt', value: true, type: 'Boolean' } ],
         fookey: 'o8IJAq2GJQqUHfAfDdbdk7Krv2CLwk',
         barkey: '5920995790' } }
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
Body:  "{\"txid\":\"05c6e8e1a81d5f39e0292834b184f5dde999294fcdf55d5829d3ae8b1d9540d6\"}"
*/