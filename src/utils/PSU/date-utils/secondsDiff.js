'use strict';
module.exports = function secondsDiff (startDate, endDate) {
	try {
		return Math.max(0, Math.floor(Math.abs(endDate-startDate) / 1000));
	} catch (e) {}

	return 0;
};
