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

var asset = {
    issueAddress: address,
    amount: 500000,
    divisibility: 0,
    fee: 1000,    
    metadata: {
        assetName: loremIpsum({count: 1,units: 'words' }),        
        issuer: loremIpsum({count: 3,units: 'words' }), // Name of the asset issuer
        description: loremIpsum({count: 1,units: 'sentences' }),
        urls: [
            {name: loremIpsum({count: 1,units: 'words' }),url: 'http://'+randomString(3)+'.com', mimeType: 'text/html', dataHash: randomHex(64)},
            {name: loremIpsum({count: 1,units: 'words' }),url: 'http://'+randomString(3)+'.com', mimeType: 'text/html', dataHash: randomHex(64)},
            {name: loremIpsum({count: 1,units: 'words' }),url: 'http://'+randomString(3)+'.com', mimeType: 'text/html', dataHash: randomHex(64)}
            ],
        encryptions: [
            {key: "consectetur", pubKey: pair['public'],format:"pem",type:'pkcs1' }
        ],            
        userData : {
            meta: [
                {key: loremIpsum({count: 1,units: 'words' }), value: randomInteger(5), type: 'Number'},
                {key: loremIpsum({count: 1,units: 'words' }), value: randomString(), type: 'String'},
                {key: loremIpsum({count: 1,units: 'words' }), value: true, type: 'Boolean'}
            ], 
            xxx:'82760',
            consectetur:'Labore nisi deserunt aliqua duis cupidatat consectetur sunt ipsum. Duis enim qui velit incididunt consectetur consectetur velit proident eiusmod ex fugiat id. Ad elit voluptate pariatur amet amet reprehenderit quis elit voluptate do tempor. Commodo ad mollit non deserunt quis dolor dolor anim irure.',
            bue: true
        }
    }
};
     
setTimeout(function(){
	postToApi('issue',asset,function(err, body, file){
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
                            console.log("Saved to issuance file [data/issuance.csv]");
                        });                        
                    },5000);                
            }
        });
      }, 5000);
    }
    });
}, wait_milis);

