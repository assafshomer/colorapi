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
var txHex = '01000000017aaeb19da971c550ac8b1f630262ef003f7965ddf533c9b98a425f2bded9d4ff0100000000ffffffff0358020000000000001976a914642a98ae9be32cbf8aadcd345532f21ac18f511b88ac0000000000000000086a06434301150005d8d6f505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';
var signedTxHex = signTx(txHex, key);

console.log("signedTxHex: ["+signedTxHex+"]");


/*
signedTxHex: [01000000017aaeb19da971c550ac8b1f630262ef003f7965ddf533c9b98a425f2bded9d4ff010000006b483045022100bfd474abe5a7ba3fc7f950a15987bdecba0b1c7312027894e7b92c7a7ed431de02207e7dfba6428c2e0d2997dae93b6a76e1c1cd6492349ee27b07c1ef438a7008eb012102c5ac36c34715ebf5b82abab08132ca08e90cc40ed8c2ca29620d0f00f28655d6ffffffff0358020000000000001976a914642a98ae9be32cbf8aadcd345532f21ac18f511b88ac0000000000000000086a06434301150005d8d6f505000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000]
*/