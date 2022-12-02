'use strict';
module.exports = function returnDecimalPlaces (value, decimalsToReturn) {
	if ( value === null ) {
		return null;
	}
	decimalsToReturn    = decimalsToReturn || 0;

	// 'toFixed' rounds, we are avoiding that by adding another digit of precision
	let fixedValue      = value.toFixed(++decimalsToReturn);

	// then dropping that digit
	let ret             = fixedValue.slice(0, fixedValue.length-1);

	// and the leading '+' is to convert back to a number
	return +ret; // convert to number
};
