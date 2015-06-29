require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();
address = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';

akp = newAddressKeyPair();
new_address = akp['address'];

var asset = {
		"from": address,
    "fee": 1000,
    "to": [{
    	"address": new_address,
    	"amount": 1,
    	"assetId": 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV'
    }]
};

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

