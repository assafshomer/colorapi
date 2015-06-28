require('../helpers/api_helper.js')();

getFromApi('addressinfo','n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR',function(err, body){
  if (err) consule.log('error: '+err);
});