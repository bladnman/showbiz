'use strict';
module.exports = function random (max, min) {
	max 			= parseInt(max);
	min 			= parseInt(min);

	if (isNaN(max)) {
		max = 10;
	}
	if (isNaN(min)) {
		min = 0;
	}

	if (min > max) {
		var t = min;
		min = max;
		max = t;
	}

	return Math.floor(Math.random() * ((max+1) - min)) + min;
};
