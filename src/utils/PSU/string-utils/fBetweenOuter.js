'use strict';
const fLeftBack = require('./fLeftBack');
const fRight = require('./fRight');

module.exports = function fBetweenOuter (string, delimLeft, delimRight) {
	return fLeftBack(fRight(string, delimLeft), delimRight);
};
