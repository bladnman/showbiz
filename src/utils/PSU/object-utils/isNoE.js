'use strict';
const isAnyNoE = require('./isAnyNoE');
const isArray = require('../type-utils/isArray');
const getStringValue = require('../string-utils/getStringValue');

/**
 * is null or empty
 */
module.exports = function isNoE (object) {
	// UNDEFINED
	if (typeof object === 'undefined') {
		return true;
	}

	// NULL
	if (object === null) {
		return true;
	}

	// MULTIPLE arguments
	// use isAnyNoE(...)
	if ( arguments.length > 1 ) {
		return isAnyNoE.apply(this, arguments);
	}

	// SINGLE argument
	else {
		// ARRAY: test for empty
		if ( isArray(object) ) {

			// not items
			if (object.length < 1) {
				return true;
			}

			// 1 item, but it is null
			if (object.length === 1 && isNoE(object[0]) ) {
				return true; // only element is empty
			}

			// not empty
			return false;
		}

		// (jquery special) HAS 'jquery' value
		if ( object.jquery && object.length < 1 ) {
			return true;
		}

		// STRING value test
		return getStringValue(object) === '';
	}
};
