require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();

// console.log(newMultisigAddress(2,3))


var keypair = require('keypair');
 
var pair = keypair();
console.log(pair);