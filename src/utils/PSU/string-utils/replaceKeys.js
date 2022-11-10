'use strict';
const isNoE = require('../object-utils/isNoE');
const getBooleanValue = require('../getBooleanValue');
const getIntValue = require('../math-utils/getIntValue');
const isObject = require('../type-utils/isObject');
const replaceFor = require('./replaceFor');

/**
 * Returns a string with all the keys replaced with the values in the key-value hash passed in.
 * String keys in the passed in string should be of the form {{A_KEY}}. Notice the "{{" and "}}"
 * to denote the key delimeters.
 *
 * @param string the string with the keys to be replaced
 * @param params a key value hash that will be used to replace parts of the string param.
 * @param options : urlEncode:true/false
 *
 *
 * Example usage :
 *
 * var input    = "hi i'm a {{MY_KEY}}!";
 * var output    = replaceKeys(input, {MY_KEY: "Bear"});
 *
 * //output is "hi i'm a Bear!"
 *
 * */
module.exports = function (string, params, options) {

  // CHECK INPUTS

  if ( isNoE(string) ) {
    return null;
  }

  if ( !params ) {
    return string;
  }

  var outString = string;

  // OPTIONS
  options = options || {};
	var urlEncode = ('urlEncode' in options) ? getBooleanValue(options.urlEncode) : false;
	var encodeEntireResponse = ('encodeEntireResponse' in options) ? getBooleanValue(options.encodeEntireResponse) : false;

  // CLEAN KNOWN VALUES
  if ( 'SIZE' in params ) {
    params.SIZE = getIntValue(params.SIZE);
  }
  if ( 'OFFSET' in params ) {
    params.OFFSET = getIntValue(params.OFFSET);
  }

  // ITERATE OVER KEY-VALUE HASH AND REPLACE
  var keys = Object.keys(params);
  for ( var i = 0; i < keys.length; ++i ) {
    var key = keys[i];
    var value = params[key];
    key = "{{" + key + "}}";        // ADD DELIMITERS

    // AT THIS TIME WE DO NOT HANDLE STRINGIFYING OBJECTS
    if ( isObject(value) ) {
      value = '';
    }

    if ( value == null ) {
      value = '';
    }

    if ( urlEncode && ! encodeEntireResponse ) {
      value = encodeURI(value);
    }

    outString = replaceFor(outString, key, value);

	  if ( encodeEntireResponse ) {
		  outString = encodeURIComponent(outString);
	  }

  }
  return outString;
};
