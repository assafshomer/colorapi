var request = require('request');
var open = require('open');
var fs = require('fs');

module.exports = function(){ 

	this.qrUrl = function qrUrl(string) {
	  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl='+string;	
	}

	this.showQR = function showQR(string){
		console.log(string);
		open(qrUrl(string));
	}

}