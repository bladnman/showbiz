'use strict';
const arrayIndexOf = require('./arrayIndexOf');

module.exports = function arrayContains(array, element) {
	return arrayIndexOf(array, element) > -1;
};
