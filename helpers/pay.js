require('../bin/current_address.js')();
// address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
amount = 0.01;

function qr_url(address,bitcoin_amount) {
  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=bitcoin:'+address+'?amount='+bitcoin_amount;	
}

var open = require('open');
open(qr_url(address,amount));

console.log("Please visit "+qr_url(address,amount));