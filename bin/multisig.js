var bitcoin = require('bitcoinjs-lib')
var scripts = bitcoin.scripts
var Address = bitcoin.Address
var networks = bitcoin.networks
var util = require('util')
require('../helpers/address_helper.js')();

var pubkeys_hex = manyKeyPairs(3)['pubkeys']
var pubkeys = pubkeys_hex.map(bitcoin.ECPubKey.fromHex)
var redeemScript = scripts.multisigOutput(1, pubkeys)

var scriptPubKey = scripts.scriptHashOutput(redeemScript.getHash())
var multisigAddress = Address.fromOutputScript(scriptPubKey, networks.testnet).toString()

console.log("redeemscript = ", redeemScript.toHex())
console.log("multisigAddress = " + multisigAddress)