var bitcoin = require('bitcoinjs-lib');
key = bitcoin.ECKey.makeRandom()
wif = key.toWIF();
address = key.pub.getAddress().toString();

console.log('new bitcoin address: ['+address+']');
console.log('Private Key of new address: ['+wif+']');