var bitcoin = require('bitcoinjs-lib');
var fs = require('fs');

module.exports = function(){
	
	this.newAddress = function newAddress(){
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
		return address;
	};

	this.newAddressKeyPair = function newAddressKeyPair(){
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
		return {"key":wif, "address":address};
	};

	this.address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
	this.priv = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';	
}