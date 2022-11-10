'use strict';
const isNumber = require('./isNumber');

module.exports = function isInt (obj) {
	return isNumber(obj) && obj % 1 === 0;
};
