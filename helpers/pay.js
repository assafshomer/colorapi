// require('../bin/current_address.js')();
address = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';
amount = 0.01;

function qr_url(address,bitcoin_amount) {
  return 'https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=bitcoin:'+address+'?amount='+bitcoin_amount;	
}

var open = require('open');
open(qr_url(address,amount));

// console.log("Please visit "+qr_url(address,amount));