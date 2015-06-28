require('../helpers/api_helper.js')();

// assetid = 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ';
// txid='8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076'
// index = '2'

assetid = 'LVmupEGGyK7Xs5SV963jGYX9kjYvx4BcJ3';
txid='5239237018de8b3c6f0e5af09edc4f403af3597ceb37b23fc69a424868745f1e'
index = '2'



getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});

getFromApi('stakeholders',assetid,function(err, body){
  if (err) console.log('error: '+err);
});