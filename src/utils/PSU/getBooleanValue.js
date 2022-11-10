'use strict';

const isBoolean = require('./type-utils/isBoolean');
const getStringValue = require('./string-utils/getStringValue');

module.exports = function getBooleanValue (object) {

  // boolean
  if ( isBoolean(object) ) {
    return object;
  }

  switch (getStringValue(object).toLowerCase()) {
  case 'true':
  case 't':
  case '1':
  case 'yes':
  case 'y':
  case 'checked':
  case 'selected':
  case 'on':
    return true;
  default:
    return false;
  }
};
