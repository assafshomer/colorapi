require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();

key = priv;
txHex = '0100000001d23356c2dc397c1c1698b1c29a3eb444a41cfce2df23edab649424eef82acdcd0000000000ffffffff020000000000000000086a06434301050110b8820100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
      
var unsigned = txHex;
var signed = signTx(unsigned,key);
var data_params = {'txHex': signed};
postToApi('broadcast',data_params,function(err, body, file){
    if (err) {console.log('error: '+err);}
})

