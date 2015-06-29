require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();
// address = 'mx462JxQ3cABqyh1puTsspgixgNM8DeCBK';
address = 'miQnYGkmPZ5yne2S2n3UibxZLcAhMhNCAL';

getFromApi('addressinfo',address,function(err, body){
  if (err) console.log('error: '+err);
});