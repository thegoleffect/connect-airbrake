/*!
 * Connect - Airbrake
 * Copyright(c) 2011 Van Nguyen <thegoleffect@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var airbrake = require("airbrake");


/**
 * Setup form with the given `options`.
 *
 * Options:
 *
 *   - `api_key`        Airbrake App API Key
 *   - `verbose`        Console log status messages. Defaults to `false`
 *
 * Examples:
 *
 *      var Airbrake = require('connect-airbrake');
 *      var server = connect.createServer(
 *        Airbrake({ api_key: "" }),
 *      );
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
module.exports = function(options){
  var airbrake_client, logger; 
  if (options == null) {
      options = {};
  }
  log = Logger(options.verbose);
  
  if (options.api_key != null){
    try {
      airbrake_client = airbrake.client(options.api_key);
    } catch (error) {
      console.log(error);
      return function(req, res, next){
        next();
      }
    }
    
    process.addListener('uncaughtException', function(err, stack) {
      log("Caught exception: " + err + "\n" + err.stack);
      log('\u0007');
      if (airbrake_client) {
        return airbrake_client.notify(err);
      }
    });
  } else {
    log("Airbrake currently disabled");
  }
  
  return function(req, res, next){
    next();
  }
}

Logger = function(verbose){
  if (verbose != null){
    return function(msg){
      console.log(msg);
    }
  } else {
    return function(){}
  }
}