var fs = require('fs'),
    md5 = require('md5'),
    request = require('request'),
    parser = require('JSONStream'), // Remember to put .parse(what to parse) here when this is called
    moment = require('moment'),
    sessionId = fs.readFileSync('session.txt', 'utf8'),
    utcTime = moment().utc().format("YYYYMMDDHHmmss");

var devId = '';
var authKey = '';
var baseUri = 'http://api.smitegame.com/smiteapi.svc/';

// Check if a session.txt file exists **Currently not working**
function checkSession() {
    if (fs.existsSync('session.txt')) {
        return fs.readFileSync('session.txt', 'utf8');
    }
    else {
        createSession();
        checkSession();
    }
}

// Creates a Session Signature that will be used for
// every call to the API
function createSession() {
    var sessionHash = smite.genSig('createsession');
    request(baseUri + 'createsessionJson/' + devId + '/' + sessionHash + '/' + utcTime).pipe(parser.parse('session_id')).pipe(fs.createWriteStream('session.txt'));
}

// Function to get a md5 hash of the current method you
// will be calling from the Smite API
function genSig(methodName) {
    var sigHash = md5(devId + methodName + authKey + utcTime);
    return sigHash;
}


function getGods(){
    var godsHash = genSig('getgods');
    request(baseUri + "getgodsjson/" + devId + '/' + godsHash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('gods.json'));
}


function getItems(){
    var itemsHash = genSig('getitems');
    request(baseUri + "getitemsjson/" + devId + '/' + itemsHash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('items.json'));
}

exports.utcTime = utcTime;
exports.getItems = getItems;
exports.getGods = getGods;
exports.genSig = genSig;