'use strict';
const random = require('./random');

module.exports = function flipIsHeads () {
	var r = random(1);
	return r === 1;
};
