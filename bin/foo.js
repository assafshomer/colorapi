require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
var fs = require('fs');

akp = newAddressKeyPair();
address = akp['address'];
key = akp['key'];

console.log("a:"+address+"|k:"+key)