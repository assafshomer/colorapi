var bitcoin = require('bitcoinjs-lib');
var request = require('request');

assetid = 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ';
txid='8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076'
index = '0'

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



// getFromApi('assetmetadata',assetid,function(err, body){
//   if (err) consule.log('error: '+err);
// });

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) consule.log('error: '+err);
});

// getFromApi('assetmetadata',assetid+'/0',function(err, body){
//   if (err) consule.log('error: '+err);
// });

getFromApi('stakeholders',assetid+'/0',function(err, body){
  if (err) consule.log('error: '+err);
});

// getFromApi('addressinfo',assetid,function(err, body){
//   if (err) consule.log('error: '+err);
// });