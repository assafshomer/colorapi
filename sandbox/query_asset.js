require('../helpers/api_helper.js')();

assetid = 'LKGB7pAL7hW7LHAgj8y7m9pJxVHMiuXxjz4s1'
txid='15e706a772e9c9e3eb5e975e468e3edd66a883b20a5b263e8c9149756d85d5ac'
index = '2'


getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});