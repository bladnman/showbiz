'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function isDateAfterDate (thisDate, thatDate) {
	if (isNoE(thisDate) || isNoE(thatDate)) {
		return false;
	}
	return thisDate.getTime() > thatDate.getTime();
};
