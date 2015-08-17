// sign_multisig.js
var bitcoin = require('bitcoinjs-lib');
var privKeys = [ 'Kz6XuRHniKZfWxSLSC7YdN8AmB6oXaDSfHhxa6TPfwmcAC8URE7b','L3u4otRKpgBwC8JaJPGiWpYWaLQqQngVVhmG6bZXoEL6V85bywnd','KzaAL6uKn2zHUULhsESuDDNguS2TsjDZv3ebgiFbFzGSqg5oMZ89'];

var redeemScript = '522103ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2210352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946210330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b53ae';

var txHex = '0100000001719317d1d89cbbe89f0783053b5a6ba16ab584ac6f9a60ed25cafe94c6f9f3680000000000ffffffff020000000000000000096a074343010527b010ce8101000000000017a9141442dada3e43b037543440bad2ad9695a360a6558700000000'

var tx  = bitcoin.Transaction.fromHex(txHex);

var txb = bitcoin.TransactionBuilder.fromTransaction(tx);

var rawSignedTransaction;

txb.tx.ins.forEach(function(input, i) {

    var txid   = bitcoin.bufferutils.reverse(input.hash).toString('hex');

    txb.sign(i, bitcoin.ECKey.fromWIF(privKeys[0]), bitcoin.Script.fromHex(redeemScript));
    txb.sign(i, bitcoin.ECKey.fromWIF(privKeys[1]), bitcoin.Script.fromHex(redeemScript));

    try {
        rawSignedTransaction = txb.build().toHex();

        console.log('Successfully signed.');
    } catch (e) {
        if ('Transaction is missing signatures' === e.message) {
            rawSignedTransaction = txb.buildIncomplete().toHex();
        } else if ('Not enough signatures provided' === e.message) {
            console.log('Not enough signatures provided');

            rawSignedTransaction = txb.buildIncomplete().toHex();
        } else {
            console.log(e);
        }
    }
});

console.log(rawSignedTransaction);