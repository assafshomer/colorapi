var bitcoin = require('bitcoinjs-lib');
var fs = require('fs');

key = bitcoin.ECKey.makeRandom();
wif = key.toWIF();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+address+']');
console.log('key: ['+wif+']');

body=address+','+wif;

fs.appendFile('../data/private_keys.csv', body+'\n', function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Saved to private keys file [data/private_keys.csv]");
});	

/*
new TESTNET address: [n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR]
key: [KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn]
*/