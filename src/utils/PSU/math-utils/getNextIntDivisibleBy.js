'use strict';
const isInt = require('../type-utils/isInt');

module.exports = function getNextIntDivisibleBy(startVal, divisibleBy) {
	// must send INTs, and divisibleBy cannot be 0
	if ( ! isInt(startVal) || ! isInt(divisibleBy) || divisibleBy === 0  ) {
		return null;
	}

	var lower = Math.floor(startVal / divisibleBy);
	var upper = (lower+1) * divisibleBy;

	return (lower >= startVal) ? lower : upper;
};
