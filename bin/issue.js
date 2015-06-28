var bitcoin = require('bitcoinjs-lib');
require('../helpers/api_helper.js')();

key = bitcoin.ECKey.makeRandom();
address = key.pub.getAddress(bitcoin.networks.testnet).toString();

var asset = {
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

postToApi('issue',asset,function(err, body){
  if (err) consule.log('error: '+err);
});