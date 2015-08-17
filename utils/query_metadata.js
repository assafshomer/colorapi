require('../helpers/api_helper.js')();

assetid = 'LDJMbzwCBWhrrXpKS7TrCfoAWYgXQhwZg1G6R'
txid='66a681cf98ef2f03300c5c1aec7cd84862fe19567aa0334a424ff2a69cceebdc'
index = '2'


getFromApi('assetmetadata',assetid+'/'+txid+':'+index,function(err, body){
  if (err) console.log('error: '+err);
});