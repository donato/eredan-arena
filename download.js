var request = require('request');
var fs = require('fs');

var url = 'http://www.eredan-arena.com/gateway.php?lang=us';
var SESS_ID = '_______________';

var formData = {
    version:'web',
    params:[],
    action:'Load_get_datas',
    device:'COMPUTER_MAC_DEVICE'
};

var j = request.jar();
var cook = request.cookie('PHPSESSID=' + SESS_ID);
j.setCookie(cook, url);

var options = {
    url : url,
    formData : formData,
    jar : j
};

console.log('Making request...');

request.post(options, callback);

function callback(err, resp, body) {
    console.log('Writing to file...');
    fs.writeFile('eredan_data.json', body);
    console.log('Fetch complete');
}
