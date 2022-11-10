'use strict';
const isNoE = require('../object-utils/isNoE');
const isDateAfterOrEqualToDate = require('./isDateAfterOrEqualToDate');
const isDateBeforeOrEqualToDate = require('./isDateBeforeOrEqualToDate');

module.exports = function isDateBetweenDates (dateInQuestion, earlierDate, laterDate) {
	if (isNoE(dateInQuestion) || isNoE(earlierDate) || isNoE(laterDate)) {
		return false;
	}
	return  isDateAfterOrEqualToDate(dateInQuestion, earlierDate) && isDateBeforeOrEqualToDate(dateInQuestion, laterDate);
};
