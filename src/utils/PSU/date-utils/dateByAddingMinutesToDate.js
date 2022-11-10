'use strict';
const dateByAddingSecondsToDate = require('./dateByAddingSecondsToDate');

module.exports = function dateByAddingMinutesToDate (date, minutes) {
	return dateByAddingSecondsToDate(date, minutes * 60);
};
