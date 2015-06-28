require('../helpers/api_helper.js')();

assetid = 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ';
txid='8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076'
index = '2'

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) consule.log('error: '+err);
});

getFromApi('stakeholders',assetid,function(err, body){
  if (err) consule.log('error: '+err);
});