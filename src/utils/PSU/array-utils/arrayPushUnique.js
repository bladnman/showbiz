'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function arrayPushUnique(array, element) {
	if ( typeof array === 'undefined' || isNoE(element) ) {
		return;
	}
	if ( ! array.contains(element) ) {
		array.push(element);
	}
};
