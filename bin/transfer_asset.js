require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();
address = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';

akp = newAddressKeyPair();
new_address = akp['address'];

var asset = {
		"from": address,
		// "sendutxo":"36a00ea27312626e4236e1ea7fd70e20505b4949744f1f62fd9d5978011a56f2:2",
    "fee": 1000,
    "to": [{
    	"address": new_address,
    	"amount": 100,
    	"assetId": 'LRECPhDhg1fBmZmU7b5jyKC48zp5x264ba'
    },
    {
    	"address": address,
    	"amount": 499900,
    	"assetId": 'LRECPhDhg1fBmZmU7b5jyKC48zp5x264ba'
    }]
};

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

