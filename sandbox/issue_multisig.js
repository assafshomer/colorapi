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
Body:  "{\"txHex\":\"0100000001fa9e0775c969fe34b612b8008ac512d93a71196e59fb6366cf3ce42f227187df0000000000ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110003c0f00000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000\",\"assetId\":\"LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ\"}"

*/