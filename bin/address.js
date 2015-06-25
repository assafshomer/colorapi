var bitcoin = require('bitcoinjs-lib');

key = bitcoin.ECKey.makeRandom();
wif = key.toWIF();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();
console.log('new TESTNET address: ['+address+']');
console.log('key: ['+wif+']');

/*
new TESTNET address: [n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR]
key: [KzH9zdXm95Xv3z7oNxzM6HqSPUiQbuyKoFdQBTf3HKx1B6eYdbAn]
*/
var request = require('request');
function getFromApi(api_endpoint, data, callback) {
	console.log('Get from:'+api_endpoint+'/', data);
	request.get('http://api.coloredcoins.org:80/v2/'+api_endpoint+'/'+data, function (error, response, body) {
	    if (error) {
	        return callback(error);
	    }
	    if (typeof body === String) {
	        body = JSON.parse(body);
	    }
	    console.log('Status:', response.statusCode);
	    console.log('Body:', body);
	  	return callback(null, body);
	});
};

getFromApi('addressinfo','n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR',function(err, body){
  if (err) consule.log('error: '+err);
});

