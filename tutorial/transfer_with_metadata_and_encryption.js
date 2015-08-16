// transfer.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var issuance_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
var key = bitcoin.ECKey.makeRandom();
var assetId = 'LFz41uCdFzCFwMfYHEpjDQLc9Erpk6dhE7VGW'
var keypair = require('keypair');
var pair = keypair();
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
    metadata:  { 
      userData: 
       { 
         user_key_1: 'some value for user key 1',
         user_key_2: '3769944303'  
       }
   },
    encryptions: [
        {key: "user_key_1", pubKey: pair['public'],format:"pem",type:'pkcs1' }
    ]    
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
Body:  {"txHex":"0100000002d640951d8baed329585df5cd4f2999e9ddf584b1342829e0395f1da8e1e8c6050200000000ffffffff0cfff4787c44415aec5ba03ee72884329229972037c7b48785d11860fedec5fe0000000000ffffffff05ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103f3f19042caf1083a531e11c45b7471a31ba00a71ba31a05a93cbeb4e611b6bcc52ae58020000000000001976a914246a3621dae93a71eacde3f994a31932f564468388ac58020000000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000000000001e6a1c434301119731b8cc2bae95fa14df0ba22a62f6e63036a17101020203b47d0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","metadataSha1":"9731b8cc2bae95fa14df0ba22a62f6e63036a171","multisigOutputs":[]}
Body:  "{\"txid\":\"b48b266f8da4b3a97a3680da0dd584fd82d6d1cc0c8aa199aa1be7c888b4ff66\"}"
*/