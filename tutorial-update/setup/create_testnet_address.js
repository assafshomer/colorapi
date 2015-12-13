var bitcoin = require('bitcoinjs-lib');
key = bitcoin.ECKey.makeRandom();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+address+']');
wif = key.toWIF();
console.log('Private Key of new address (WIF format): ['+wif+']');