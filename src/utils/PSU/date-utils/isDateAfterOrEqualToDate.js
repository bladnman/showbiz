'use strict';
const isDateBeforeDate = require('./isDateBeforeDate');

module.exports = function isDateAfterOrEqualToDate (thisDate, thatDate) {
	return ! isDateBeforeDate(thisDate, thatDate);
};
