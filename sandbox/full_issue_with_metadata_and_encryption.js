require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
var keypair = require('keypair');
var pair = keypair();
var fs = require('fs');

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
        assetId: "askjdfaksjdflasdlkfj",
        assetName: "some lone asset name that I just invented",        
        issuer: "the issuer of this asset is currently in hiding", // Name of the asset issuer
        description: "I have to make up some long description",
        urls: [{"name": 'foo',"url": 'http://wwww.gooooggggle.com', "mimeType": 'text/html', "dataHash": '123'}], // array of urlItems
        userData : {meta: [
                {key: 'bar', value: 1234, type: 'Number'},
                {key: 'buzz', value: "xxxxxx", type: 'String'},
                {key: 'quuax', value: true, type: 'Boolean'}
            ]
        } 
    },
    "encryptions": [
        {key: "userData", pubKey: pair['public'],format:"pem",type:'pkcs1' }
    ]
};

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