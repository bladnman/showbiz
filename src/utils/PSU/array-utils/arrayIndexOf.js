'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function arrayIndexOf(array, element) {
	if ( isNoE(array) || isNoE(element) ) {
		return -1;
	}
	for(var i = 0; i < array.length; i++) {
		if(array[i] === element) {
			return i;
		}
	}
	return -1;
};
