require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
require('../helpers/data_helper.js')();

var loremIpsum = require('lorem-ipsum')
var keypair = require('keypair');
var pair = keypair();
var fs = require('fs');
var util = require('util')  

wait_milis = 1000;

var transfer = {
    from: address,
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
    amount: 10,
    fee: 1000,    
    metadata:  { assetName: 'in',
      issuer: 'fugiat laborum sit',
      description: 'In irure aliqua do ut elit cillum exercitation non ullamco adipisicing qui do.',
      urls: 
       [ { name: 'ad',
           url: 'http://iWC.com',
           mimeType: 'text/html',
           dataHash: '78b52e8137fc30f54afc245b6729563648105baff31d1d3a71dd6dffae919a3' },
         { name: 'ad',
           url: 'http://Gvz.com',
           mimeType: 'text/html',
           dataHash: '4181100cf2ddf9011ff686d7e069a12e04412f772b98fabb1e46b61c6a977d0' },
         { name: 'incididunt',
           url: 'http://hbQ.com',
           mimeType: 'text/html',
           dataHash: '0f5c91cda0c4ec79418f0b415df50dfec3ea4b5ef62ad8081b2ece59571309a' } ],
      userData: 
       { meta: 
          [ { key: 'incididunt', value: '86519', type: 'Number' },
            { key: 'elit', value: 'Qiyk5rT7Dm', type: 'String' },
            { key: 'officia', value: true, type: 'Boolean' } ],
         fookey: 'j1jz767AXCwUM8Skv1tlfIafGXxasE',
         barkey: '3769944303' } 
     }
};
     
setTimeout(function(){
	postToApi('sendasset',transfer,function(err, body, file){
	  if (err) {
        console.log('error: '+err);
    } else {                
        var path = '../log/'+file;        
        setTimeout(function(){
            var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
            var key = priv;
            var unsigned = obj['txHex'];
            var assetid = obj['assetId'];
            var signed = signTx(unsigned,key);
            var data_params = {'txHex': signed};
            postToApi('broadcast',data_params,function(err, body, file){
                if (err) {
                    console.log('error: '+err);
            } else {
                var post_path = '../log/'+file;
                    setTimeout(function(){
                        var obj = JSON.parse(fs.readFileSync(post_path, 'utf8'));
                        var txid = obj['txid']
                        body=address+','+key+','+assetid+','+txid;
                        fs.appendFile('../data/issuance.csv', body+'\n', function(err) {
                            if(err) {
                                return console.log(err);
                            }
                            console.log("Saved to issuance file ["+logFileName()+"]");
                        });                        
                    },5000);                
            }
        });
      }, 5000);
    }
    });
}, wait_milis);

