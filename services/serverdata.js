/**
 * @desc contains server data for smite servers
 * @module serverdata
 */

"use strict";

var http = require('http');
var _assign = require('lodash.assign');
var utcTime = require('moment').utc().format("YYYYMMDDHHmmss");
var md5 = require('md5');
var generatesession = require('./generatesession');
var log = require('log4node');
log.setLogLevel(process.env.LOG_LEVEL || 'debug');

var config = {
    language: '1', //1 = English
    returnType: 'json', //json or xml (who uses xml anymore amirite?)
    devId: null,
    authKey: null
};

function setConfig(update){
    _assign(config, update);
    //log.debug('configuring: ' + JSON.stringify(config));
}



/**
 * Language
 * @enum
 * @static
 * @readonly
 */
const LANGUAGE = {
    ENGLISH: '1',
    GERMAN: '2',
    FRENCH: '3',
    SPANISH: '7',
    SPANISHLATINAMERICA: '9',
    PORTUGUESE: '10',
    RUSSIAN: '11',
    POLISH: '12',
    TURKISH: '13'
};

/**
 * Smite API URL
 * @enum
 * @readonly
 * @static
 */
const BASE_URL = {
    URL: "http://api.smitegame.com/smiteapi.svc/"
};

/**
 * URLS for the riot API
 * @enum
 * @static
 * @readonly
 */
const URLS = {
    // Test Server Status
    connectivity: {
        ping: '/ping{returnType}'
    }
};

/**
 * Generates a URL based on paramters passed in
 * @param {string} callmethod the method to call
 * @param {options!} options to encode in the url
 * @returns {string} url representing the call specified
 * @static
 */
function generateUrl(callmethod, options) {
    var url = null;

    //Set Language - If none specified, then use default(english)
    var language = (options && options.language ? options.language : config.language);

    //Set returnType - Default is JSON
    var returnType = (options && options.returnType ? options.returnType : config.returnType);

    //Set DevID and AuthKEY
    var devId = config.devId;
    var authKey = config.authKey;

    //Create a signature(hash) for the url
    var sigHash = md5(devId + callmethod + authKey + utcTime);

    //Quick grab session ID
    //TODO testing only
    var sessionId = '4A3098DE941C46B896E25DE166D7C1A2';

    //Check for required parameters
    if (language && callmethod && devId && sigHash && sessionId && 0 < callmethod.length && 0 < devId.length && 0 < sigHash.length && 0 < sessionId.length) {
        log.debug('\nLanguage: ' + language + '\nCallmethod: ' + callmethod + '\nDevID: ' + devId + '\nSigHash: ' + sigHash + '\nSessionID: ' + sessionId);

        var host = BASE_URL.URL;
        url = host + [callmethod] + returnType;


    }
    log.debug('Final URL: ' + JSON.stringify(url));
    return url;
}

/**
 * returns a Promise to perform asynchronous http call to the specified URL.
 * @param {string} url url to call
 * @static
 */
function makeAsyncHttpCall(url){
    return makeCallToApi(url, http);
}

function makeCallToApi(url, module){

    return new Promise(function(resolve,reject){

        module.get(url, function(res){
            log.debug('in get callback for: ' + url + '\nres: ' + res.statusCode + ' | ' + res.statusMessage);
            if(200 !== res.statusCode){
                reject(new Error(res.statusMessage));
            }else{
                var body = '';
                res
                    .on('data', function(chunk){
                            body += chunk;
                        }
                    )
                    .on('end', function(){
                            log.debug('body data: ' + body);
                            resolve(JSON.parse(body));
                        }
                    );
            }
        }).on('error', function(error){
            log.error(error);
            reject(new Error('error making API call: ' + error));//TODO: check if JSON
        });
    });
}

module.exports.config = config;
module.exports.setConfig = setConfig;
module.exports.generateAPIUrl = generateUrl;
module.exports.makeAsyncHttpCall = makeAsyncHttpCall;