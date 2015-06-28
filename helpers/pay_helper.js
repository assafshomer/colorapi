var request = require('request');
var open = require('open');
var fs = require('fs');

module.exports = function(){ 

	this.qrUrl = function qrUrl(address,bitcoin_amount) {
	  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=bitcoin:'+address+'?amount='+bitcoin_amount;	
	}

	this.fundAddress = function fundAddress(address,amount){
		open(qrUrl(address,amount));
	}

}