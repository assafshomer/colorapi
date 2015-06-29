require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();


akp = newAddressKeyPair();
new_address = akp['address'];

from_add = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';

var asset = {
	"from": from_add,		
    "fee": 1000,
    "to": [{
    	"address": new_address,
    	"amount": 2,
    	"assetId": 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV'
    },
    {
    	"address": address,
    	"amount": 3,
    	"assetId": 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV'
    }]
};

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

