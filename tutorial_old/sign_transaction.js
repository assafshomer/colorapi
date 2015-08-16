
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
signedTxHex: [010000000121175a1b9f709e151cd19aefaa95a77da681ff6b87371a755d9c9182feaf2370010000006b48304502210089360de91df17746b71ebd35d5bbffd13a00bc192be459c8efb01c18d932bc7202201db8892673d25806de94d820ae9551eadf946bda314b58829cd1084f57498cc0012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff0358020000000000001976a914ca259a5ff555ebe8c145dc5fb963a62766f033c488ac00000000000000000c6a0a4343010527b000221010767f0100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000]
*/