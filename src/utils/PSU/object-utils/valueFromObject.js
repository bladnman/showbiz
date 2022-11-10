'use strict';
const contains = require('../string-utils/contains');
const fLeft = require('../string-utils/fLeft');
const fRight = require('../string-utils/fRight');
const isArray = require('../type-utils/isArray');


module.exports = function valueFromObject (key, object) {

  if ( !key || !object ) {
    return null;
  }

  // try to get value as efficiently as possible
  var value       = object[key];
  if ( typeof value !== 'undefined' ) {
    return value;
  }

  // was not directly accessible: if object actually has the key, then return what is there
  if ( key in object ) {
    return object[key];
  }

  // KEY has a dot -- walk the object structure
  else if ( contains(key, ".") ) {
    var preDot = fLeft(key, ".");
    var postDot = fRight(key, ".");
    // object has the 'predot' as an object
    if ( preDot in object ) {
      return valueFromObject(postDot, object[preDot]);
    }
  }

  // ARRAY OF KEYS - check values one at a time
  else if ( isArray(key) ) {
    var keyKeys = Object.keys(key);
    for ( var k = 0; k < keyKeys.length; k++ ) {
      var keyKey = key[keyKeys[k]];
      if ( object[keyKey] ) {
        return object[keyKey];
      }
    }

  }

  // couldn't find anything
  return null;
};
