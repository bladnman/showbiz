'use strict';
module.exports = function dateByAddingSecondsToDate (date, seconds) {
	if (date instanceof Date) {
		return new Date(date.getTime() + seconds * 1000);
	}
	return null;
};
