'use strict';
const random = require('./random');

module.exports = function roll (sided) {
	return random(Math.max(1, sided), 1);
};
