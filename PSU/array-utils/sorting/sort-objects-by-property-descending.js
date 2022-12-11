'use strict';
module.exports = function sortObjectsByPropertyDescending (objects, prop) {
	return objects.sort( (a, b) => b[prop] - a[prop] );
};
