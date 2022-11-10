'use strict';
const fLeft = require('../string-utils/fLeft');
const fBetween = require('../string-utils/fBetween');
const fRightBack = require('../string-utils/fRightBack');

module.exports = function dateFromYMD (ymdString) {

	var year        = fLeft(ymdString, "-");
	var month       = fBetween(ymdString, "-", "-");
	var day         = fRightBack(ymdString, "-");

	// bail
	if (year === "" || month === "" || day === "") {
		return null;
	}

	return new Date(year, month - 1, day);
};
