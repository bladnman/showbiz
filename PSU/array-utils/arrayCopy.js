'use strict';
module.exports = function arrayCopy(array) {
	if ( array === null || (typeof array === undefined) ) {
		return null;
	}

	var copy = [];
	for (var i=0; i < array.length; i++) {
		copy.push(array[i]);
	}
	return copy;
};
