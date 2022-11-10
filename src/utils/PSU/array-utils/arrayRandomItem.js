'use strict';
const isNoE = require('../object-utils/isNoE');
const roll = require('../math-utils/roll');

module.exports = function arrayRandomItem(array) {
	if ( isNoE(array) ) {
		return null;
	}
	let randomIndex = roll( array.length );
	return array[randomIndex - 1];
};
