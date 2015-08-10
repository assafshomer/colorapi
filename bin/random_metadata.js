require('../helpers/api_helper.js')();
require('../helpers/pay_helper.js')();
require('../helpers/address_helper.js')();
require('../helpers/sign_helper.js')();
require('../helpers/broadcast_helper.js')();
require('../helpers/data_helper.js')();

var loremIpsum = require('lorem-ipsum')
var fs = require('fs');
var util = require('util')  

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
        userData : {meta: [
                {key: loremIpsum({count: 1,units: 'words' }), value: randomInteger(5), type: 'Number'},
                {key: loremIpsum({count: 1,units: 'words' }), value: randomString(), type: 'String'},
                {key: loremIpsum({count: 1,units: 'words' }), value: true, type: 'Boolean'}
            ]
        } 
    }
};

     
console.log('asset: ',util.inspect(asset, {depth:10}))