'use strict';
module.exports = function isObject (obj) {
	// Null and Undefined are also objects in JavaScript
	// when we are asking if this is an Object
	// we mean to say
	if ( typeof obj === 'undefined' || obj === null) {
		return false;
	}
	return Object.prototype.toString.call( obj ) === '[object Object]';
};
