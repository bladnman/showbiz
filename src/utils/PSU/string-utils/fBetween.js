'use strict';
const fLeft = require('./fLeft');
const fRight = require('./fRight');

module.exports = function fBetween (string, delimLeft, delimRight) {
	return fLeft(fRight(string, delimLeft), delimRight);
};
