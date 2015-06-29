require('../helpers/api_helper.js')();

assetid = 'LRECPhDhg1fBmZmU7b5jyKC48zp5x264ba'


getFromApi('stakeholders',assetid,function(err, body){
  if (err) console.log('error: '+err);
});