
// Data to issue

  var request = require('request');

  var data = {
      "issueAddress": "mxNTyQ3WdFMQE7SGVpSQGXnSDevGMLq7dg",
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

// issue asset

  request.post({
    url: 'http://api.coloredcoins.org:80/v2/issue',
    headers: {
      'Content-Type': 'application/json'
    },
    form: data
  }, function (error, response, body) {

    if (typeof body === String) {
      body = JSON.parse(body);
    }
    console.log('Status: ', response.statusCode);
    console.log('Headers: ', JSON.stringify(response.headers));
    console.log('Body: ', JSON.stringify(body));
  });

// Sign TX

  var signedTxHex = signTx(body.txHex, myPrivateKey);

// transmit transaction

  var data_params = {
    tx_hex: signedTxHex
  };

  request.post({
    url: 'http://api.coloredcoins.org:80/v2/transmit',
    headers: {
      'Content-Type': 'application/json'
    },
    form: data_params
  }, function (error, response, body) {
    
    if (typeof body === String) {
      body = JSON.parse(body);
    }
    console.log('Status: ', response.statusCode);
    console.log('Headers: ', JSON.stringify(response.headers));
    console.log('Body: ', JSON.stringify(body));
  });

