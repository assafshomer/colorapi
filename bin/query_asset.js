require('../helpers/api_helper.js')();

// assetid = 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ';
// txid='8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076'
// index = '2'

// assetid = 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV';
// txid='98dc807cb73ed849b00dd2f3613ff82270759674e3d38ab6170fbab8e42bcc5e'
// index = '3'

assetid = 'Lb9W5W5EFHhXK5Uv9rcMRvPV9WzJyPxpFP'
txid='2ea25d59979e35aec53037b2bf47014f21358f550c8ef290e04249b152ba3de5'
index = '1'

// getFromApi('assetmetadata',assetid,function(err, body){
//   if (err) console.log('error: '+err);
// });

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});

// getFromApi('stakeholders',assetid,function(err, body){
//   if (err) console.log('error: '+err);
// });