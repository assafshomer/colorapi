var request = require('request');
var fs = require('fs');

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
			fs.writeFile('./log/utxos.json', JSON.stringify(JSON.parse(body)['utxos']), function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    console.log("utxos.json was saved!");
			});	
	  	return callback(null, body);
	});
};

getFromApi('addressinfo','n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR',function(err, body){
  if (err) console.log('error: '+err);
});


