'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function arrayPopElement(array, element) {
	if ( isNoE(array) || isNoE(element) ) {
		return null;
	}
	var index = array.indexOf(element);
	if (index > -1) {
		var newArray = array.splice(index, 1);
		if ( newArray.length === 1 ) {
			return newArray[0];
		}
		return null;
	}
	return null;
};
