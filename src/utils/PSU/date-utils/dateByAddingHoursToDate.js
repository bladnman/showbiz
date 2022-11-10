'use strict';
const dateByAddingSecondsToDate = require('./dateByAddingSecondsToDate');

module.exports = function dateByAddingHoursToDate (date, hours) {
	return dateByAddingSecondsToDate(date, hours * 60 * 60);
};
