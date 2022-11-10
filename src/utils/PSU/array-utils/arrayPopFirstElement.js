'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function arrayPopFirstElement(array) {
	if ( isNoE(array) ) {
		return null;
	}
	return array.splice(0, 1)[0];
};
