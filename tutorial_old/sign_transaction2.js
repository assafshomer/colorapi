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
var txHex = '01000000011fc40634d28ba68319d87c3a0b754fba05baa2386fdcb50a73b5d9151f46c6d80000000000ffffffff0358020000000000001976a914b0ffe61e2a6daa62accc1a04e053da8e59b851a588ac00000000000000000c6a0a4343010527b000221010d6d9f505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var signedTxHex = signTx(txHex, key);

console.log("signedTxHex: ["+signedTxHex+"]");

/*
signedTxHex: [01000000011fc40634d28ba68319d87c3a0b754fba05baa2386fdcb50a73b5d9151f46c6d8000000006b483045022100ae66ae7efaec1cd1fa6daa363657d833a152d988569909aef08ed160401f845a02206e6c34cfc7c0f5903d8eec0a8466bc710dc834260194ac65190c4f717e9ae933012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff0358020000000000001976a914b0ffe61e2a6daa62accc1a04e053da8e59b851a588ac00000000000000000c6a0a4343010527b000221010d6d9f505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000]
*/