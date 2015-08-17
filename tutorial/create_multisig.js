var bitcoin = require('bitcoinjs-lib');
var scripts = bitcoin.scripts;
var Address = bitcoin.Address;
var network = bitcoin.networks.testnet;

var raw_privKeys = [];
var pubKeys = [];
var redeemScript

function newMultisigAddress(m,N){	

	for (var i = 1; i <= N; i++) {
		pk = bitcoin.ECKey.makeRandom();
		raw_privKeys.push(pk);						
	};

	pubKeys = raw_privKeys.map(function (key) {
		return key.pub.toHex()
	});

	var raw_pubkeys = pubKeys.map(bitcoin.ECPubKey.fromHex)
	redeemScript = scripts.multisigOutput(m, raw_pubkeys)
	var scriptPubKey = scripts.scriptHashOutput(redeemScript.getHash())
	var multisigAddress = Address.fromOutputScript(scriptPubKey, network).toString()
	return multisigAddress
}

console.log('multisigAddress',newMultisigAddress(2,3))
console.log('redeemScript',redeemScript.toHex())
var wifs = raw_privKeys.map(function(key){return key.toWIF()})
console.log('privKeys (wif)',wifs)
console.log('pubKeys', pubKeys)