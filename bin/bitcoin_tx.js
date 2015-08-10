var bitcoin = require('bitcoinjs-lib')
require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
var fs = require('fs');
var scripts = bitcoin.scripts
var Address = bitcoin.Address
var networks = bitcoin.networks
var util = require('util')

tx = new bitcoin.Transaction()

// Add the input (who is paying) of the form [previous transaction hash, index of the output to use]
tx.addInput("365a53533185f48c0e5dc77c1432db60b2a006f4d3b5565374cffb095524e9ab", 2)

// Add the output (who to pay to) of the form [payee's address, amount in satoshis]
tx.addOutput(address, 15000)

// Initialize a private key using WIF
key = bitcoin.ECKey.fromWIF(priv)

// Sign the first input with the new key
tx.sign(0, key)
var txHex = tx.toHex()
// Print transaction serialized as hex
console.log(txHex)
// => 0100000001313eb630b128102b60241ca895f1d0ffca21 ...

// You could now push the transaction onto the Bitcoin network manually (see https://blockchain.info/pushtx)

var transaction = {
    'txHex': txHex
}

postToApi('broadcast', transaction, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});