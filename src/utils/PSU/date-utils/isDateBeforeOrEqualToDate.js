'use strict';
const isDateAfterDate = require('./isDateAfterDate');

module.exports = function isDateBeforeOrEqualToDate (thisDate, thatDate) {
	return ! isDateAfterDate(thisDate, thatDate);
};
