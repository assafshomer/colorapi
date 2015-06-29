require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();

akp = newAddressKeyPair();
new_address = akp['address'];

address = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';

var asset = {
		"from": address,
    "fee": 1000,
    "to": [{
    	"address": new_address,
    	"amount": 1,
    	"assetId": 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV'
    }]
};

getFromApi('stakeholders',asset['to'][0]["assetId"],function(err, body){
  if (err) console.log('error: '+err);
});

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

