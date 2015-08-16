// issue_with_metadata.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var funded_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
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
    issueAddress: funded_address,
    amount: 1000,
    fee: 1000,
    metadata: {
        assetName: "Lexus Hoverboard",        
        issuer: "Marty McFly", 
        description: "Anti-Beef Hoverboard",
        urls: [
                {name: 'Wired Article',"url": 'http://www.wired.com/2015/08/lexus-hoverboard/', "mimeType": 'text/html', "dataHash": '66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc'},
                {name: 'utube promo',"url": 'https://youtu.be/q_BYvUlDviM', "mimeType": 'text/html', "dataHash": '15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a'}
                        ],
        userData : 
                {meta: [
                       {key: 'Weight', value: 1234, type: 'Number'},
                       {key: 'Model', value: "Magneto", type: 'String'},
                       {key: 'In Stock', value: true, type: 'Boolean'}
                       ]
        } 
    }
};
postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
Body:  {"txHex":"0100000001911c51a13e34454558387fdb42d813f2c96f0996488163abfcf30d9c59fd93f10100000000ffffffff03ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff21033d135d08ade560dc17b00bf1b7c63ea9c5aab4354777be278a6155c1413ed09752ae00000000000000001d6a1b43430102f5e946907c7bf48eb23335caae940cf87e08fb572013100c800100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","assetId":"LFz41uCdFzCFwMfYHEpjDQLc9Erpk6dhE7VGW"}
Body:  "{\"txid\":\"d75a9545f36b8388d2ccd06b8ecbedefedde6e8084be39831d6f8de084ee41ec\"}"
*/