var bitcoin = require('bitcoinjs-lib');
var scripts = bitcoin.scripts;
var Address = bitcoin.Address;
var network = bitcoin.networks.testnet;

var key = bitcoin.ECKey.makeRandom();

console.log("key.pub",key.pub.toHex())