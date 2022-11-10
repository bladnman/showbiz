'use strict';
const isArray = require('./type-utils/isArray');
const isString = require('./type-utils/isString');
const isA = require('./object-utils/isA');

/**
 * @memberof module:PSU
 * @method getArrayValue
 * @param  {string}      value The string to split
 * @param  {string}      delim The delimiter to use to split
 * @return {string[]}
 */
module.exports = function getArrayValue (value, delim) {
	// array
	if ( isArray(value) ) {
		return value;
	}

	// nothing
	if ( value === null || value === '' ) {
		return null;
	}

	if ( isString(value) && isA(delim) ) {
		return value.split(delim);
	}

	// other
	return [value];
};
