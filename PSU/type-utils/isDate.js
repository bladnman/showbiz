'use strict';
module.exports = function isDate (obj) {
	return Object.prototype.toString.call( obj ) === '[object Date]';
};
