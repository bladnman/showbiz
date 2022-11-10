'use strict';
const isValidDate = require('./isValidDate');
const isNoE = require('../object-utils/isNoE');

module.exports = function trimmedISOUTCFromDate (val) {

	if (isNoE(val)) {
		return null;
	}

	let dateObj = new Date(val);

	if (!isValidDate(dateObj)) {
		return null;
	}

	let fullISOString = dateObj.toISOString();

	return fullISOString.slice(0, fullISOString.indexOf('.')) + 'Z';
};
