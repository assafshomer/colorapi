require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();
console.log('address',address)
console.log('new_address',new_address)
var asset = {
	from: address,		
    fee: 1000,
    to: [{
    	address: new_address,
    	amount: 2,
    	assetId: 'LKGB7pAL7hW7LHAgj8y7m9pJxVHMiuXxjz4s1'
    },
    {
    	address: address,
    	amount: 3,
    	assetId: 'LKGB7pAL7hW7LHAgj8y7m9pJxVHMiuXxjz4s1'
    }],
    metadata: 
       { assetName: 'sunt',
         issuer: 'exercitation cillum do',
         description: 'Laborum deserunt cillum tempor anim proident eiusmod eu tempor ad exercitation nisi duis id.',
         urls: 
          [ { name: 'do',
              url: 'http://8Vp.com',
              mimeType: 'text/html',
              dataHash: '15105644d48ac365d4cc9059848dc0ef5ecf45d7b53a201e9d941c3e1bd9df6' },
            { name: 'excepteur',
              url: 'http://jBk.com',
              mimeType: 'text/html',
              dataHash: 'd4b720680ae8d5ffa4f6a7dbc67ec2b066f4f1ea1fab979afcd0eab13396ce3' },
            { name: 'ipsum',
              url: 'http://FnC.com',
              mimeType: 'text/html',
              dataHash: '169780dd40dcc0c94970e4d1f3a03c2208265a685f1e4cabe517db924d26ea5' } ],
         userData: 
          { meta: 
             [ { key: 'sit', value: '32544', type: 'Number' },
               { key: 'amet', value: 'NpSZY3mmNb', type: 'String' },
               { key: 'eu', value: true, type: 'Boolean' } ],
            fookey: 'aeQOlq2DPhopBLGkbtaDtl4phzRNpB',
            barkey: '4318827105' } }
    };

postToApi('sendasset',asset,function(err, body){
  if (err) console.log('error: '+err);
});

