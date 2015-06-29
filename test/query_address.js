require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();

address = 'mp4s1ancwRXLVH4QWP8aFMp6Z2SYcnLskV';

getFromApi('addressinfo',address,function(err, body){
  if (err) console.log('error: '+err);
});