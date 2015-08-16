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
    metadata:  { 
      userData: 
       { 
         user_key_1: 'j1jz767AXCwUM8Skv1tlfIafGXxasE',
         user_key_2: '3769944303'  
       }
   }
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
Body:  {"txHex":"0100000001ec41ee84e08d6f1d8339be84806edeedefedcb8e6bd0ccd288836bf345955ad70200000000ffffffff05ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff21035c7e62a765f105029bd90ef38240c6f7c2b8449aeca77247770ff077e99721a052ae58020000000000001976a91498141e70c2e1693c92be22aca07af6c8ab9a0adc88ac58020000000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000000000001e6a1c43430111c56a942a25e6703b739a6dfeb69ac12e88a9cdc301020203c8740100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","metadataSha1":"c56a942a25e6703b739a6dfeb69ac12e88a9cdc3","multisigOutputs":[]}
Body:  "{\"txid\":\"fbb95094c9a2a07a2845120563a538480b3de54af1961d18ee127beada9fc0a9\"}"

{
  "assetId": "LFz41uCdFzCFwMfYHEpjDQLc9Erpk6dhE7VGW",
  "divisibility": 0,
  "someUtxo": "fbb95094c9a2a07a2845120563a538480b3de54af1961d18ee127beada9fc0a9:1",
  "totalSupply": 1000,
  "numOfHolders": 2,
  "numOfTransfers": 1,
  "numOfIssuance": 1,
  "firstBlock": -1,
  "issuanceTxid": "d75a9545f36b8388d2ccd06b8ecbedefedde6e8084be39831d6f8de084ee41ec",
  "issueAddress": "n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR",
  "metadataOfIssuence": {
    "data": {
      "assetName": "Lexus Hoverboard",
      "issuer": "Marty McFly",
      "description": "Anti-Beef Hoverboard",
      "urls": [
        {
          "name": "Wired Article",
          "url": "http://www.wired.com/2015/08/lexus-hoverboard/",
          "mimeType": "text/html",
          "dataHash": "66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc"
        },
        {
          "name": "utube promo",
          "url": "https://youtu.be/q_BYvUlDviM",
          "mimeType": "text/html",
          "dataHash": "15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a"
        }
      ],
      "userData": {
        "meta": [
          {
            "key": "Weight",
            "value": "1234",
            "type": "Number"
          },
          {
            "key": "Model",
            "value": "Magneto",
            "type": "String"
          },
          {
            "key": "In Stock",
            "value": "true",
            "type": "Boolean"
          }
        ]
      }
    }
  },
  "sha2Issue": "033d135d08ade560dc17b00bf1b7c63ea9c5aab4354777be278a6155c1413ed097",
  "metadataOfUtxo": {
    "data": {
      "userData": {
        "user_key_1": "j1jz767AXCwUM8Skv1tlfIafGXxasE",
        "user_key_2": "3769944303"
      }
    }
  },
  "sha2Utxo": "035c7e62a765f105029bd90ef38240c6f7c2b8449aeca77247770ff077e99721a0"
}
*/