'use strict';
module.exports = function isNumber (obj) {
	return Object.prototype.toString.call( obj ) === '[object Number]';
};
