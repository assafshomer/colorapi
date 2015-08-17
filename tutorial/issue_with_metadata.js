// issue_with_metadata.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var funded_address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';
function postToApi(api_endpoint, json_data, callback) {
    console.log(api_endpoint+': ', JSON.stringify(json_data));
    request.post({
        url: 'http://testnet.api.coloredcoins.org:80/v2/'+api_endpoint,
        headers: {'Content-Type': 'application/json'},
        form: json_data
    }, 
    function (error, response, body) {
        if (error) {
            return callback(error);
        }
        if (typeof body === 'string') {
            body = JSON.parse(body)
        }
        console.log('Status: ', response.statusCode);
        console.log('Body: ', JSON.stringify(body));
        return callback(null, body);
    });
};
var asset = {
  issueAddress: funded_address,
  amount: 1000,
  fee: 1000,
  metadata: {
    assetName: "Lexus Hoverboard",        
    issuer: "Marty McFly", 
    description: "Anti-Beef Hoverboard",
    urls: [
      {name: 'Wired Article',"url": 'http://www.wired.com/2015/08/lexus-hoverboard/', "mimeType": 'text/html', "dataHash": '66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc'},
      {name: 'utube promo',"url": 'https://youtu.be/q_BYvUlDviM', "mimeType": 'text/html', "dataHash": '15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a'}
              ],
    userData :{
      meta: [
        {key: 'Weight', value: 1234, type: 'Number'},
        {key: 'Model', value: "Magneto", type: 'String'},
        {key: 'In Stock', value: true, type: 'Boolean'}
             ],
      price: 1234567,
      "technical specification": 'In a weak applied field, a superconductor expels nearly all magnetic flux. It does this by setting up electric currents near its surface. The magnetic field of these surface currents cancels the applied magnetic field within the bulk of the superconductor. As the field expulsion, or cancellation, does not change with time, the currents producing this effect (called persistent currents) do not decay with time. Therefore the conductivity can be thought of as infinite: a superconductor. Near the surface, within a distance called the London penetration depth, the magnetic field is not completely cancelled. Each superconducting material has its own characteristic penetration depth. Any perfect conductor will prevent any change to magnetic flux passing through its surface due to ordinary electromagnetic induction at zero resistance. The Meissner effect is distinct from this: when an ordinary conductor is cooled so that it makes the transition to a superconducting state in the presence of a constant applied magnetic field, the magnetic flux is expelled during the transition. This effect cannot be explained by infinite conductivity alone. Its explanation is more complex and was first given in the London equations by the brothers Fritz and Heinz London. It should thus be noted that the placement and subsequent levitation of a magnet above an already superconducting material does not demonstrate the Meissner effect, while an initially stationary magnet later being repelled by a superconductor as it is cooled through its critical temperature does.'
    } 
  }
};
postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
Body:  {"txHex":"0100000001706d55720506c968bdff2fcbc625bc558a4bca63a0fa747ee5af211b50350c450100000000ffffffff03ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff21038ea9fc0be8a92d05545750375c79094aaa915bd6135fc3543a0ef8d036864d5852ae00000000000000001d6a1b43430102349b8dd84634428c83bfb755079eee288227531b2013100c800100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","assetId":"LEjtW9dppmaqEEibUVKSY1uAoZCfXP1TDierE"}

Body:  "{\"txid\":\"cb0c06917b721740f04f2720bf084797e221b2d1239cbce003ddf72b0d0da4c3\"}"


{
  "assetId": "LEjtW9dppmaqEEibUVKSY1uAoZCfXP1TDierE",
  "divisibility": 0,
  "someUtxo": "cb0c06917b721740f04f2720bf084797e221b2d1239cbce003ddf72b0d0da4c3:2",
  "totalSupply": 1000,
  "numOfHolders": 1,
  "numOfTransfers": 0,
  "numOfIssuance": 1,
  "firstBlock": -1,
  "issuanceTxid": "cb0c06917b721740f04f2720bf084797e221b2d1239cbce003ddf72b0d0da4c3",
  "issueAddress": "n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR",
  "metadataOfIssuence": {
    "data": {
      "assetName": "Lexus Hoverboard",
      "issuer": "Marty McFly",
      "description": "Anti-Beef Hoverboard",
      "urls": [
        {
          "name": "Wired Article",
          "url": "http://www.wired.com/2015/08/lexus-hoverboard/",
          "mimeType": "text/html",
          "dataHash": "66111ceeed2b7bb977dc2354e870a655a91f2c6909347bf53d3d7918b5743fc"
        },
        {
          "name": "utube promo",
          "url": "https://youtu.be/q_BYvUlDviM",
          "mimeType": "text/html",
          "dataHash": "15b7c49342a7b74dfbc98506930f84ff55cc0839a8960a991b5103a44aeb20a"
        }
      ],
      "userData": {
        "meta": [
          {
            "key": "Weight",
            "value": "1234",
            "type": "Number"
          },
          {
            "key": "Model",
            "value": "Magneto",
            "type": "String"
          },
          {
            "key": "In Stock",
            "value": "true",
            "type": "Boolean"
          }
        ],
        "price": "1234567",
        "technical specification": "In a weak applied field, a superconductor expels nearly all magnetic flux. It does this by setting up electric currents near its surface. The magnetic field of these surface currents cancels the applied magnetic field within the bulk of the superconductor. As the field expulsion, or cancellation, does not change with time, the currents producing this effect (called persistent currents) do not decay with time. Therefore the conductivity can be thought of as infinite: a superconductor. Near the surface, within a distance called the London penetration depth, the magnetic field is not completely cancelled. Each superconducting material has its own characteristic penetration depth. Any perfect conductor will prevent any change to magnetic flux passing through its surface due to ordinary electromagnetic induction at zero resistance. The Meissner effect is distinct from this: when an ordinary conductor is cooled so that it makes the transition to a superconducting state in the presence of a constant applied magnetic field, the magnetic flux is expelled during the transition. This effect cannot be explained by infinite conductivity alone. Its explanation is more complex and was first given in the London equations by the brothers Fritz and Heinz London. It should thus be noted that the placement and subsequent levitation of a magnet above an already superconducting material does not demonstrate the Meissner effect, while an initially stationary magnet later being repelled by a superconductor as it is cooled through its critical temperature does."
      }
    }
  },
  "sha2Issue": "038ea9fc0be8a92d05545750375c79094aaa915bd6135fc3543a0ef8d036864d58"
}









*/