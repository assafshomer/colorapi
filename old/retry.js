var bitcoin = require('bitcoinjs-lib');
var request = require('request');

address = 'mk31UsjJkQMs8pakWtEbbzPWS4E3vFepuW'
wif = 'L39MCxTrVQwAcRt7TZ58nKrrAcQgEJMCbfwH9tEtYDS1y4HiFnXx'

var data = {
    "issueAddress": address,
    "amount": 1,
    "fee": 1000,
    "metadata": {
        "userData": {
            "ID": "ID",
            "Name": "AssetName",
            "Description": "AssetDescription",
            "Type": "AssetType"
        }
    }
};

console.log("data:" +JSON.stringify(data));

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

call_api('issue',data);

/*
Status:  200
Headers:  {"server":"nginx/1.6.2","date":"Tue, 23 Jun 2015 12:11:00 GMT","content-type":"application/json; charset=utf-8","content-length":"463","connection":"close","x-powered-by":"Express","access-control-allow-headers":"Content-Type, api_key"}
Body:  "{\"txHex\":\"0100000001e889154bb7ae5aa52b460435ecc4c1d6365e2cdfbb86fc6a72abf9e71ce55e460100000000ffffffff03580200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103b4af67f2c9caa9672926492ad18bf58cb2c8657785e9e4d08afa74cec93de36a52ae00000000000000001c6a1a43430102a00a3e5f885af0b10ef0bde4c8cde5a9417067020110e83f0f00000000001976a914318fa45ab2c42529d0cca7e35d32011c4957e3fb88ac00000000\",\"assetId\":\"LcgS1VUfMsdZCFJFUzhUTrojNbJhRZL6TQ\"}"
*/