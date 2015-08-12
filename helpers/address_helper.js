var bitcoin = require('bitcoinjs-lib');
var scripts = bitcoin.scripts;
var Address = bitcoin.Address;
var networks = bitcoin.networks;
var fs = require('fs');

module.exports = function(){
	
	this.newAddress = function newAddress(){
		var key = bitcoin.ECKey.makeRandom();
		var wif = key.toWIF();
		var address = key.pub.getAddress(bitcoin.networks.testnet).toString();
		// console.log('new TESTNET address: ['+address+']');
		// console.log('key: ['+wif+']');

		var body=address+','+wif;

		fs.appendFile('../data/private_keys.csv', body+'\n', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    // console.log("Saved to private keys file [data/private_keys.csv]");
		});
		return address;
	};

	this.newAddressKeyPair = function newAddressKeyPair(){
		var key = bitcoin.ECKey.makeRandom();
		var wif = key.toWIF();
		var address = key.pub.getAddress(bitcoin.networks.testnet).toString();
		// console.log('new TESTNET address: ['+address+']');
		// console.log('key: ['+wif+']');

		var body=address+','+wif;

		fs.appendFile('../data/private_keys.csv', body+'\n', function(err) {
		    if(err) {
		        return console.log(err);
		    }
		    // console.log("Saved to private keys file [data/private_keys.csv]");
		});
		return {"key":wif, "address":address};
	};

	this.manyKeyPairs = function manyKeys(num){
		var util = require('util')       
		var privKeys = [];		
		for (var i = 1; i <= num; i++) {
			pk = newAddressKeyPair()['key'];
			privKeys.push(pk);						
		};		
		var pubKeys = privKeys.map(function (key) {
			return bitcoin.ECKey.fromWIF(key).pub.toHex()
		});
        return {privkeys: privKeys, pubkeys: pubKeys}
	}

	this.newMultisigAddress = function newMultisigAddress(m,N){
		var pubkeys_hex = manyKeyPairs(N)['pubkeys']
		var pubkeys = pubkeys_hex.map(bitcoin.ECPubKey.fromHex)
		var redeemScript = scripts.multisigOutput(m, pubkeys)
		var scriptPubKey = scripts.scriptHashOutput(redeemScript.getHash())
		var multisigAddress = Address.fromOutputScript(scriptPubKey, networks.testnet).toString()
		return multisigAddress
	}

	this.address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
	this.priv = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';	
	this.new_address = newAddress();
}