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

	this.address = 'msqgN6ahSbvZTxt1D5kduVZpvCupivagmB';
	this.priv = 'L1f8FyVKM97LU8L9bjYqMv3tE6KrVfAavzdy7A2igV1voJM3UEkx';	
}