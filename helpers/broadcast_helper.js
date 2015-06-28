var bitcoin = require('bitcoinjs-lib');
module.exports = function(){ 
	this.broadcast = function broadcast(signedTxHex) {
		var data_params = {'txHex': signedTxHex};
		postToApi('broadcast',data_params,function(err, body){
			if (err) console.log('error: '+err);
		});		
	}
}