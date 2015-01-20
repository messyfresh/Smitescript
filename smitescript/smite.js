var fs = require('fs'),
    md5 = require('md5'),
    request = require('request'),
    parser = require('JSONStream'), // Remember to put .parse(what to parse) here when this is called
    moment = require('moment'),
    utcTime = moment().utc().format("YYYYMMDDHHmmss"),
    baseUri = 'http://api.smitegame.com/smiteapi.svc/';

// Creates a Session Signature that will be used for
// every call to the API
function createSession(devId, authKey) {
    var sessionHash = md5(devId + "createsession" + authKey + utcTime)
    request(baseUri + 'createsessionJson/' + devId + '/' + sessionHash + '/' + utcTime).pipe(parser.parse('session_id')).pipe(fs.createWriteStream('session.txt'));
}


function getGods(devId, authKey, sessionId){
    var godsHash = md5(devId + "getgods" + authKey + utcTime);
    request(baseUri + "getgodsjson/" + devId + '/' + godsHash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('gods.json'));
}


function getItems(devId, authKey, sessionId){
    var itemsHash = md5(devId + "getitems" + authKey + utcTime)
    request(baseUri + "getitemsjson/" + devId + '/' + itemsHash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('items.json'));
}

exports.createSession = createSession;
exports.getItems = getItems;
exports.getGods = getGods;