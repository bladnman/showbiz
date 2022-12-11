'use strict';
module.exports = function isString (obj) {
	return Object.prototype.toString.call( obj ) === '[object String]';
};
