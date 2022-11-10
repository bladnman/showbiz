'use strict';
const isNoE = require('./isNoE');

/**
 * @memberof module:PSU
 * @function isAnyNoE
 * @return {Boolean}
 */
module.exports = function isAnyNoE () {
	// no args
	if (typeof arguments === 'undefined') {
		return true;
	}

	// SEND ANY NUMBER OF ARGS
	// each will be tested for isNoE
	// if any are (true) then we we return true
	for (var x = 0; x < arguments.length; x++) {
		if (isNoE(arguments[x])) {
			return true;
		}
	}

	return false;
};
