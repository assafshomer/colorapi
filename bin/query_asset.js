require('../helpers/api_helper.js')();

// assetid = 'LgcDSqEnNGNdZPvBA8eGNaFUXA6Yjms7YZ';
// txid='8ddaf1f77a38d7dc0a9ceb787f217f5d153a9a8eced2dd836ed04944dfcaf076'
// index = '2'

// assetid = 'LKKmzoiSMdFeHeC4TC4hzmprB3sR4jyWNV';
// txid='98dc807cb73ed849b00dd2f3613ff82270759674e3d38ab6170fbab8e42bcc5e'
// index = '3'

assetid = 'LEYSPuPCH9nbKdKarB2teTifvXqK4q372WB8q'
txid='c22315cecdcea2762d15fbdff506cb22b3da5bf4e29ac2bf781e2ff0635b2b35'
index = '2'

// getFromApi('assetmetadata',assetid,function(err, body){
//   if (err) console.log('error: '+err);
// });

getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});

// getFromApi('stakeholders',assetid,function(err, body){
//   if (err) console.log('error: '+err);
// });