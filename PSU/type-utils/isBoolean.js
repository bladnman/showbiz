'use strict';
module.exports = function isBoolean (obj) {
	return Object.prototype.toString.call( obj ) === '[object Boolean]';
};
