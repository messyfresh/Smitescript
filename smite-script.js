/**
 * @desc Main module of Smitescript
 * @module smitescript
 */

"use strict";

var serverdata = require('./services/serverdata');
var connectivity = require('./api/connectivity');


/**
 * @func
 * @desc sets the configuration
 * @param {object} config key/value pairs to set
 * @return {object} returns the config object
 * @static
 */
module.exports.setConfig = serverdata.setConfig;

/**
 * connectivity api
 * @type {module:connectivity}
 */
module.exports.connectivity = connectivity;