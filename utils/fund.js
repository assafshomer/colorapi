var bitcoin = require('bitcoinjs-lib')
require('../helpers/qr_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();

// // akp = newAddressKeyPair();
// // address = akp['address'];
address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR'
amount = 0.001;
fundAddress(address,amount);
