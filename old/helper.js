function call_api(api_endpoint,json_data) {
	request.post({
	  url: 'http://api.coloredcoins.org:80/v2/'+api_endpoint,
	  headers: {
	    'Content-Type': 'application/json'
	  },
	  form: json_data
	}, function (error, response, body) {

	  if (typeof body === String) {
	    body = JSON.parse(body);
	  }
	  console.log('Status: ', response.statusCode);
	  console.log('Headers: ', JSON.stringify(response.headers));
	  console.log('Body: ', JSON.stringify(body));
	});	
}