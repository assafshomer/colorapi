var request = require('request');
var reply = '';
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
	    console.log('foo:', JSON.parse(body)['utxos'][0]);
	  	return callback(null, body);
	});
};

getFromApi('addressinfo','n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR',function(err, body){
  if (err) consule.log('error: '+err);
});


