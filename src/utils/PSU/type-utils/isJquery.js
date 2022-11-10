'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function isJquery (obj) {
	if ( isNoE(obj) ) {
		return false;
	}
	return (obj.jquery !== undefined);
};
