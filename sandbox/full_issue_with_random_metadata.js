require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
require('../helpers/data_helper.js')();

var loremIpsum = require('lorem-ipsum')
var keypair = require('keypair');
var pair = keypair();
var fs = require('fs');
var util = require('util')  

akp2 = newAddressKeyPair();
new_address = akp2['address'];


// IF YOU WANT TO USE A FUNDED ADDRESS, ADD HERE THE ADDRESS AND KEY AND COMMENT OUT THE NEXT SECTION

address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
key = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';
wait_milis = 1000;

// IF YOU WANT TO USE NEW ADDRESS, COMMENT OUT THE PREVIOUS SECTION

// akp = newAddressKeyPair();
// address = akp['address'];
// key = akp['key'];
// amount = 0.01;
// fundAddress(address,amount);
// wait_milis = 30000;

var asset = {
    "issueAddress": address,
    "amount": 500000,
    "divisibility": 0,
    "fee": 1000,    
    "metadata": {
        "assetName": loremIpsum({count: 1,units: 'words' }),        
        "issuer": loremIpsum({count: 3,units: 'words' }), // Name of the asset issuer
        "description": loremIpsum({count: 1,units: 'sentences' }),
        "urls": [
            {"name": loremIpsum({count: 1,units: 'words' }),"url": 'http://'+randomString(3)+'.com', "mimeType": 'text/html', "dataHash": randomHex(64)},
            {"name": loremIpsum({count: 1,units: 'words' }),"url": 'http://'+randomString(3)+'.com', "mimeType": 'text/html', "dataHash": randomHex(64)},
            {"name": loremIpsum({count: 1,units: 'words' }),"url": 'http://'+randomString(3)+'.com', "mimeType": 'text/html', "dataHash": randomHex(64)}
            ],
        "userData" : {"meta": [
                {"key": loremIpsum({count: 1,units: 'words' }), "value": randomInteger(5), "type": 'Number'},
                {"key": loremIpsum({count: 1,units: 'words' }), "value": randomString(), "type": 'String'},
                {"key": loremIpsum({count: 1,units: 'words' }), "value": true, "type": 'Boolean'}
            ]
        } 
    }
    // "encryptions": [
    //     {"key": "Name", "pubKey": pair['public'],"format":"pem","type":'pkcs1' }
    // ]
};

     
console.log("asset: ",util.inspect(asset, {depth:10}))

setTimeout(function(){
	postToApi('issue',asset,function(err, body, file){
	  if (err) {
        console.log('error: '+err);
    } else {                
        var path = '../log/'+file;        
        setTimeout(function(){
            var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
            var unsigned = obj['txHex'];
            var assetid = obj['assetId'];
            var signed = signTx(unsigned,key);
            var data_params = {'txHex': signed};
            postToApi('broadcast',data_params,function(err, body, file){
                if (err) {
                    console.log('error: '+err);
            } else {
                var post_path = '../log/'+file;
                    setTimeout(function(){
                        var obj = JSON.parse(fs.readFileSync(post_path, 'utf8'));
                        var txid = obj['txid']
                        body=address+','+key+','+assetid+','+txid;
                        fs.appendFile('../data/issuance.csv', body+'\n', function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("Saved to issuance file [data/issuance.csv]");
                        });                        
                    },5000);                
            }
        });
      }, 5000);
    }
    });
}, wait_milis);