require('../helpers/api_helper.js')();
require('..helpers/address_helper.js')();
// address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR'

getFromApi('addressinfo',address,function(err, body){
  if (err) console.log('error: '+err);
});