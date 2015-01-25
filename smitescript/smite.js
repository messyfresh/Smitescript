var fs = require('fs'),
    md5 = require('MD5'),
    request = require('request'),
    parser = require('JSONStream'), // Remember to put .parse(what to parse) here when this is called
    moment = require('moment'),
    utcTime = moment().utc().format("YYYYMMDDHHmmss"),
    baseUri = 'http://api.smitegame.com/smiteapi.svc/';

// Creates a Session Signature that will be used for
// every call to the API
function createSession(devId, authKey) {
    var hash = md5(devId + "createsession" + authKey + utcTime)
    request(baseUri + 'createsessionJson/' + devId + '/' + hash + '/' + utcTime).pipe(parser.parse('session_id')).pipe(fs.createWriteStream('session.txt'));
}


function getGods(devId, authKey, sessionId){
    var hash = md5(devId + "getgods" + authKey + utcTime);
    request(baseUri + "getgodsjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('gods.json'));
}


function getItems(devId, authKey, sessionId){
    var hash = md5(devId + "getitems" + authKey + utcTime)
    request(baseUri + "getitemsjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime + '/' + 1).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('items.json'));
}

function getPlayer(devId, authKey, sessionId, playerName){
    var hash = md5(devId + "getplayer" + authKey + utcTime)
    request(baseUri + "getplayerjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime + '/' + playerName).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('player.json'));
}

function getFriends(devId, authKey, sessionId, playerName){
    var hash = md5(devId + "getfriends" + authKey + utcTime)
    request(baseUri + "getfriendsjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime + '/' + playerName).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('friends.json'));
}

function getGodRank(devId, authKey, sessionId, playerName) {
    var hash = md5(devId + "getgodrank" + authKey + utcTime)
    request(baseUri + "getgodrankjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime + '/' + playerName).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('godrank.json'));
}

function getTopMatches(devId, authKey, sessionId) {
    var hash = md5(devId + "gettopmatches" + authKey + utcTime);
    request(baseUri + "gettopmatchesjson/" + devId + '/' + hash + '/' + sessionId + '/' + utcTime).pipe(parser.parse("*")).pipe(parser.stringify()).pipe(fs.createWriteStream('topmatches.json'));
}


exports.createSession = createSession;
exports.getItems = getItems;
exports.getGods = getGods;
exports.getPlayer = getPlayer;
exports.getFriends = getFriends;
exports.getGodRank = getGodRank;