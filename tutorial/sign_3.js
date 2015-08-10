// sign_transaction.js
var bitcoin = require('bitcoinjs-lib');
function signTx (unsignedTx, wif) {
    privateKey = bitcoin.ECKey.fromWIF(wif);
    var tx = bitcoin.Transaction.fromHex(unsignedTx)
    var insLength = tx.ins.length
    for (var i = 0; i < insLength; i++) {
        tx.sign(i, privateKey)
    }
    return tx.toHex()
};
var key = 'KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn';
var txHex = '01000000016605218c2217f94db9490cc242fbaa98125d52975f9690d3433b1bde88b4b6020100000000ffffffff020000000000000000096a074343010520121018ddf505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var signedTxHex = signTx(txHex, key);

console.log("signedTxHex: ["+signedTxHex+"]");


/*
signedTxHex: [01000000016605218c2217f94db9490cc242fbaa98125d52975f9690d3433b1bde88b4b602010000006b483045022100d1f8c27274328498453cb1afd348a835ebbe31b585c81550089729cb1e1d97a502200864c045789ef02e8a57f616d3b9deeb044fcb2771a44cca104a4515ab3e6327012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff020000000000000000096a074343010520121018ddf505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000]

*/