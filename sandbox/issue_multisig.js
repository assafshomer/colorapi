require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();

multisig_address =  '2Mu6MbHBxSpD2CLDpQRATKf3X8L4TSapmV9'
redeemScript = '522103ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2210352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946210330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b53ae'
privKeys = [ 'Kz6XuRHniKZfWxSLSC7YdN8AmB6oXaDSfHhxa6TPfwmcAC8URE7b',
  'L3u4otRKpgBwC8JaJPGiWpYWaLQqQngVVhmG6bZXoEL6V85bywnd',
  'KzaAL6uKn2zHUULhsESuDDNguS2TsjDZv3ebgiFbFzGSqg5oMZ89' ]
pubKeys = [ '03ae3cf1075ab2c7544d973903c089295ab195af63a8f3c168c9b8901b457d9ce2',
  '0352f75a371a1331fa51a20b5e6e1e4ab8f86a1f65dd36fe44a9f7ce5d2a706946',
  '0330959f464f88f7294cc412a81f72f3cb817a2738a16e187d99b8e78c4ccf9e3b' ]

// fundAddress(multisig_address,0.001);
// wait_milis = 30000;

var asset = {
    "issueAddress": multisig_address,
    "amount": 123,
    "divisibility": 0,
    "fee": 1234
};

postToApi('issue',asset,function(err, body){
  if (err) console.log('error: '+err);
});

/*
Status:  200
Body:  "{\"txHex\":\"0100000001719317d1d89cbbe89f0783053b5a6ba16ab584ac6f9a60ed25cafe94c6f9f3680000000000ffffffff020000000000000000096a074343010527b010ce8101000000000017a9141442dada3e43b037543440bad2ad9695a360a6558700000000\",\"assetId\":\"LGooTK9WEUNqSUu3i4CRJLxvejx9fbiZ2Gk1X\"}"
Body:  "{\"txid\":\"8d65657b0e14f3494c1d2ebf9145c5d348154b70fee1825246d2908183b692f6\"}"
*/