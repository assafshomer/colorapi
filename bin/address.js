var bitcoin = require('bitcoinjs-lib');

key = bitcoin.ECKey.makeRandom();
wif = key.toWIF();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+address+']');
console.log('key: ['+wif+']');

/*
new TESTNET address: [n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR]
key: [KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn]
*/