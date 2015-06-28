var fs = require('fs');
// var path = '/home/assaf/js_projects/colorapi/log/issue_1435490498939.json';
var path = '/home/assaf/js_projects/colorapi/log/issue_1435492557727.json'
var obj = JSON.parse(fs.readFileSync(path, 'utf8'));
console.log(obj);
console.log(obj['txHex']);
console.log(obj['assetId']);