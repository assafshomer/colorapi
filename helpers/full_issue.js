require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
var fs = require('fs');

akp = newAddressKeyPair();
address = akp['address'];
key = akp['key'];

amount = 0.01;
wait_milis = 30000;
fundAddress(address,amount);

var asset = {
    "issueAddress": address,
    "amount": 123,
    "divisibility": 0,
    "fee": 1234,
    "transfer": [{
    	"address": address,
    	"amount": 55
    }],
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
                            console.log("Saved to private keys file [data/issuance.csv]");
                        });                        
                    });                
            }
        });
      }, 5000);
    }
    });
}, wait_milis);