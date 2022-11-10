'use strict';
const getIntValue = require('../math-utils/getIntValue');

module.exports = function yearsFromSeconds(seconds) {
	return (getIntValue(seconds) / 31536000);
};
