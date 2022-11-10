'use strict';
module.exports = function isRegExp (obj) {
	return Object.prototype.toString.call( obj ) === '[object RegExp]';
};
