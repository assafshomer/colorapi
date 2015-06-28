var bitcoin = require('bitcoinjs-lib');
module.exports = function(){ 

	this.signTx = function signTx (unsignedTx, wif) {
		privateKey = key = bitcoin.ECKey.fromWIF(wif);
	  var tx = bitcoin.Transaction.fromHex(unsignedTx)
	  var insLength = tx.ins.length
	  for (var i = 0; i < insLength; i++) {
	    tx.sign(i, privateKey)
	  }
	  return tx.toHex()
	}

}