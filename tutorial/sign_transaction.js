
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
var txHex = '0100000001fa9e0775c969fe34b612b8008ac512d93a71196e59fb6366cf3ce42f227187df0000000000ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110003c0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000';

var signedTxHex = signTx(txHex, key);

console.log("signedTxHex: ["+signedTxHex+"]");