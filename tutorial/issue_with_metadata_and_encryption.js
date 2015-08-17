// issue_with_metadata.js
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var keypair = require('keypair');
var pair = keypair();
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
  amount: 50,
  fee: 1000,
  metadata: {
    assetName: "Time Machine",        
    issuer: "Dr. Emmet Brown", 
    description: "The flux capacitor will send us back to the future",
    urls: [
      {name: 'imdb',url: 'http://www.imdb.com/title/tt0088763/', mimeType: 'text/html', dataHash: '249e3e3c77d07d8fe8984a47bbbab8c89aeb8b1dadf4e2ff47db42a3e5a1c126'},
              ],
    encryptions: [
        {key: "Undelrying Physics", pubKey: pair['public'],format:"pem",type:'pkcs1' }
    ],               
    userData :{
      meta: [
        {key: 'Weight', value: 50000, type: 'Number'},
        {key: 'Model', value: "Delorean", type: 'String'},       
             ],
      technology: 'flux capacitor 666',
      "Undelrying Physics": 'This magnetic flux calculator calculates the magnetic flux of an object based on the magnitude of the magnetic field which the object emanates and the area of the object, according to the formula, Φ=BA, if the magnetic field is at a 90° angle (perpendicular) to the area of the object. If the magnetic field is not perpendicular to the object, then use the calculator below, which computes the magnetic flux at non-perpendicular angles. The magnetic flux is directly proportional to the magnitude of the magnetic field emanating from the object and the area of the object. The greater the magnetic field, the greater the magnetic flux. Conversely, the smaller the magnetic field, the smaller the flux. The area of the object has the same direct relationship. The greater the area of an object, the greater the flux. Conversely, the smaller the area, the smaller the magnetic flux.'
    } 
  }
};
postToApi('issue', asset, function(err, body){
    if (err) {
        console.log('error: ', err);
    }
});

/*
issue:  {"issueAddress":"n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR","amount":50,"fee":1000,"metadata":{"assetName":"Time Machine","issuer":"Dr. Emmet Brown","description":"The flux capacitor will send us back to the future","urls":[{"name":"imdb","url":"http://www.imdb.com/title/tt0088763/","mimeType":"text/html","dataHash":"249e3e3c77d07d8fe8984a47bbbab8c89aeb8b1dadf4e2ff47db42a3e5a1c126"}],"encryptions":[{"key":"Undelrying Physics","pubKey":"-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA0hw6PRO9RpHRf/pdpEMfD01odzBTaheuA1JxunVTq+/X1hGSUrpRWMIM/tp8\n9DQod6K+6Bo/2CmoZxkWPOk45tbU9QE4Cb532n+MIkzsmbvmM+i49UXSqC8v44MGKTVLb7X2\nPogItSM3lqH4KpZR3cM/JDarfS1R77U/OMDZ/YECDPbcwKPdSLQHhWJ1c9cX5+0lCSDt1WXY\n4XX+hH64C+L/Ss4dMP2kpyHvbsBYpGdLu7AmcDmHtCOl2rXR1z4E0asYGiojw3PI56ATOndS\n30ABKKgQTAExjPQ24BtJYhfJ+zD5zHhztizPPfOwrID2HTfGwVTwfXinV4bpoFfwhwIDAQAB\n-----END RSA PUBLIC KEY-----\n","format":"pem","type":"pkcs1"}],"userData":{"meta":[{"key":"Weight","value":50000,"type":"Number"},{"key":"Model","value":"Delorean","type":"String"}],"technology":"flux capacitor 666","Undelrying Physics":"This magnetic flux calculator calculates the magnetic flux of an object based on the magnitude of the magnetic field which the object emanates and the area of the object, according to the formula, Φ=BA, if the magnetic field is at a 90° angle (perpendicular) to the area of the object. If the magnetic field is not perpendicular to the object, then use the calculator below, which computes the magnetic flux at non-perpendicular angles. The magnetic flux is directly proportional to the magnitude of the magnetic field emanating from the object and the area of the object. The greater the magnetic field, the greater the magnetic flux. Conversely, the smaller the magnetic field, the smaller the flux. The area of the object has the same direct relationship. The greater the area of an object, the greater the flux. Conversely, the smaller the area, the smaller the magnetic flux."}}}
Status:  200
Body:  {"txHex":"010000000173044e4c41d8f058c4fd31a8d67733908f617eb93fe792378e6615f45358729f0100000000ffffffff03ac0200000000000047512103ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff2103e339927c047b00d57cea117b39b163c8bc14dfd852a1acfa6adcef50bf08d0e252ae00000000000000001d6a1b43430102c31c5f8505bde610b1fbf1634fa986410aa7064a2051100c800100000000001976a914ea55c2430dca31e56ef5ae55c2863dae65df908688ac00000000","assetId":"LDJMbzwCBWhrrXpKS7TrCfoAWYgXQhwZg1G6R"}

Body:  "{\"txid\":\"66a681cf98ef2f03300c5c1aec7cd84862fe19567aa0334a424ff2a69cceebdc\"}"

{
  "assetId": "LDJMbzwCBWhrrXpKS7TrCfoAWYgXQhwZg1G6R",
  "divisibility": 0,
  "someUtxo": "66a681cf98ef2f03300c5c1aec7cd84862fe19567aa0334a424ff2a69cceebdc:2",
  "totalSupply": 50,
  "numOfHolders": 1,
  "numOfTransfers": 0,
  "numOfIssuance": 1,
  "firstBlock": -1,
  "issuanceTxid": "66a681cf98ef2f03300c5c1aec7cd84862fe19567aa0334a424ff2a69cceebdc",
  "issueAddress": "n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR",
  "metadataOfIssuence": {
    "data": {
      "assetName": "Time Machine",
      "issuer": "Dr. Emmet Brown",
      "description": "The flux capacitor will send us back to the future",
      "urls": [
        {
          "name": "imdb",
          "url": "http://www.imdb.com/title/tt0088763/",
          "mimeType": "text/html",
          "dataHash": "249e3e3c77d07d8fe8984a47bbbab8c89aeb8b1dadf4e2ff47db42a3e5a1c126"
        }
      ],
      "encryptions": [
        {
          "key": "Undelrying Physics",
          "pubKey": "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEA0hw6PRO9RpHRf/pdpEMfD01odzBTaheuA1JxunVTq+/X1hGSUrpRWMIM/tp8\n9DQod6K+6Bo/2CmoZxkWPOk45tbU9QE4Cb532n+MIkzsmbvmM+i49UXSqC8v44MGKTVLb7X2\nPogItSM3lqH4KpZR3cM/JDarfS1R77U/OMDZ/YECDPbcwKPdSLQHhWJ1c9cX5+0lCSDt1WXY\n4XX+hH64C+L/Ss4dMP2kpyHvbsBYpGdLu7AmcDmHtCOl2rXR1z4E0asYGiojw3PI56ATOndS\n30ABKKgQTAExjPQ24BtJYhfJ+zD5zHhztizPPfOwrID2HTfGwVTwfXinV4bpoFfwhwIDAQAB\n-----END RSA PUBLIC KEY-----\n",
          "format": "pem",
          "type": "pkcs1"
        }
      ],
      "userData": {
        "meta": [
          {
            "key": "Weight",
            "value": "50000",
            "type": "Number"
          },
          {
            "key": "Model",
            "value": "Delorean",
            "type": "String"
          }
        ],
        "technology": "flux capacitor 666",
        "Undelrying Physics": "cv2gyjn/w9HOttpdhODnJcSGmOyhrTVsmAlnWDeIzh8VSvOGYXjM8Bkxwf9Ao5KhSf2GmFzIZNcbneNPIf1V2VnN2PBDv9oEXcZwKqf+2cJtWCK5CbwwCY4hBlSbtGT+Fs/8AWHc5blBREXZn9xMeubgUJ/H2dEiW5qK1cizlOsE/Qv8/GaRoRE7uFcCfhFqgJIFMQnYJeUtiYQoDkzsvgS84zKi1i2WjrCS6b99MQVE8mUvWP606V5nVDLDDSqe4L/pk5BCDMJ4y0ZusSvD3j7aC4jP7Z3Nyog7kcFUYFiYxVS2n6dL0vOr+gI3nvBLQda1GfQzoK3av1L8N4TkEEb9A9uJ26LUVERLoz5TRayUaGfY8a+QXnnb2Pifa69JsotTrG/qgXaltXXUo9xZwc8zKM2FkXN6iQK9g5R2Vya90t6n37ieGpC4QEFKhzvJ59VDpFNshkLhk5rxg84ulWItUILkHstGyJJblMdhNdcaecV57k2qiLbHHcz41JtbIv+mvmdHAkrc5Det+dRFvqzXN/jv6UVxk5bvX1pos+0c53m/JOgR3YIgxsHhCy8kNGj3dwy2jW8jvOll3xlDDWXbuh9fwQriJdFxh/7aknOoWc6h9g2XBSrf3p6wTEARhZ+QQKvLeY07KpzJ6w8f6lBiojcnpTqsRHOCFYjM3hsqmIcPrOPrWJG9HVk+Iwpi8XvITtuLUboKztot115CmSyat1HmJShgzmCM16W8ms7cG2qmkyUewxh0iu4jmLkVGIZRNbKRBNRJJ6t4thF0u9tNzs7PSW3ewjtppRRuqZcZvhzI5zNuOhYY9TNB+8kfrSQvUbtOGGKhjUS4T/yu4Q25oANsjTenQpEm3xxW63HIIGAGXTfzLV8pssaZtvsER37qZLacVY4XMY9NU6BiX4kyi9lb4foYJyMoqUGAOAqJJMheU+1qa4i4G0cspzzMopgCCaopzcG33eXVO5ncXVfmTc5Il8j9ZNhWVckzbFLPJRicrOrQIXW+rK9ZCfyog9jmRPupWXpgD88R4HxZWdObSN7tOTukcuKUtKhBVe8SXlE3501lMJSnwRxOt/djiUKRkQS4zbUsQGNfWVlpP0vwmTXO7jWPOKslOFVhBMVbTxr+HkzZAMGrN8a9gfTclBchNzHyJk9mSNSMcKfc6lzFKuIO2HA/IGUem2LgvlMgEmsjs7xRuFYRImlnhiajZ97P6g65n2pfsC3nE4nkP33Y6h1OlHqCtpSTKZJvlvVeNmeSvZAX811MeILunyjFcVSWDMpEaV4fIHc8bHeCYPKozUVneeYu75B5CgGZMhoqSBRUlHgSgvwFkqiEPAEWEWbSeFYFDrli/kNuOMmjKzHNZxOMXROmDQQ6Gzrcca3/JnMYiX7rEAuOZUYIrf6nX72ZovqWKsz0aI/WG8qb2nMfqfSkE2wwoG8MbxK8tvyPIZGWfySabN57zYGoyaJL5bjWuTGSFWEprgtIZyL8OIde6BTnSQONNBiwsd+S+0jvtV4CMwjNde0sBnDGzEViaqNOf1lU+5UQMKX9St6mG+foFfg3KBODN4PInw5UVuhT69ZIxXLvOazZ0ElpXIBKbgatw5IvvArplD4MJbNXi+XfMH76nQZ+1/MOy/oXtMhV5b33k0qqqB+Fn8pB0qwOVXLbC029FPP0vtW19/PKfNmlCjnnhedl4369u1U73gU="
      }
    }
  },
  "sha2Issue": "03e339927c047b00d57cea117b39b163c8bc14dfd852a1acfa6adcef50bf08d0e2"
}


*/