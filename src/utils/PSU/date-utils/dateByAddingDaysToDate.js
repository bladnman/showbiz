'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function dateByAddingDaysToDate (date, daysToAdd) {
	if( isNoE(date)) {
		return null;
	}
	var newDate = new Date(date);
	newDate.setDate(newDate.getDate() + daysToAdd);
	return newDate;
};
