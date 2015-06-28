require('../helpers/api_helper.js')();
require('./current_address.js')();
// address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

new_address = 'mjoiF7kmEyoxH4dmyeptMhkDh4haGN4KYp'

var asset = {
		"from": address,
    "fee": 1000,
    "to": [{
    	"address": new_address,
    	"amount": 1,
    	"assetId": 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ'
    }]
};

postToApi('sendasset',asset,function(err, body){
  if (err) consule.log('error: '+err);
});

