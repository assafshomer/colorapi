require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
var fs = require('fs');

akp2 = newAddressKeyPair();
new_address = akp2['address'];


// IF YOU WANT TO USE A FUNDED ADDRESS, ADD HERE THE ADDRESS AND KEY AND COMMENT OUT THE NEXT SECTION

address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
key = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';

// IF YOU WANT TO USE NEW ADDRESS, COMMENT OUT THE PREVIOUS SECTION

// akp = newAddressKeyPair();
// address = akp['address'];
// key = akp['key'];

// amount = 0.01;
// fundAddress(address,amount);

var asset = {
    "issueAddress": address,
    "amount": 123,
    "divisibility": 0,
    "fee": 1234,
    "transfer": [{"address": new_address,"amount": 33}],
    "metadata": {
        "userData": {
            "ID": "ID",
            "Name": "AssetName",
            "Description": "AssetDescription",
            "Type": "AssetType"
        }
    }
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
                var path = '../log/'+file;
                    setTimeout(function(){
                        var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
                        var txid = obj['txid']
                        body=address+','+key.toWIF()+','+assetid+','+txid;
                        fs.appendFile('../data/issuance.csv', body+'\n', function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("Saved to issuance file [data/issuance.csv]");
                        });                        
                    });                
            }
        });
      }, 10000);
    }
    });
}, 30000);