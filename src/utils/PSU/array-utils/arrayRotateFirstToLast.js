'use strict';
const isNoE = require('../object-utils/isNoE');
const arrayPopFirstElement = require('./arrayPopFirstElement');

module.exports = function arrayRotateFirstToLast(array) {
	if ( isNoE(array) ) {
		return null;
	}
	var firstElem = arrayPopFirstElement(array);
	array.push(firstElem);
	return array;
};
