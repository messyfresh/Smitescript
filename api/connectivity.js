/**
 * @module connectivity
 * @desc Wrapper for Hi-rez Connectivity <br/>
 * @see {@link https://docs.google.com/document/d/1OFS-3ocSx-1Rvg4afAnEHlT3917MAK_6eJTR6rzr-BM |See Smite API for method output.}
 */

"use strict"

var serverdata = require('../services/serverdata.js');

/**
 * gets the URL for the status api for the specified method
 * @param {string} callmethod method to generate URL for
 * @param {?object}  options options to pass to the riot server
 * @returns {string} generated url
 * @private
 */
function getStatusUrl(callmethod, options){
    return serverdata.generateAPIUrl(callmethod, options);
}

/**
 * Gets the current status of the Smite API Server
 *@see {@link https://docs.google.com/document/d/1OFS-3ocSx-1Rvg4afAnEHlT3917MAK_6eJTR6rzr-BM |See Smite API for method output.}
 */
function ping(){
    var url = serverdata.generateAPIUrl("ping");
    return serverdata.makeAsyncHttpCall(url)
}

/**
 * Generates a SessionID TODO: Not Finished
 *@see {@link https://docs.google.com/document/d/1OFS-3ocSx-1Rvg4afAnEHlT3917MAK_6eJTR6rzr-BM |See Smite API for method output.}
 */
function createSession(){
    return serverdata.makeAsyncHttpCall()
}

module.exports.ping = ping;