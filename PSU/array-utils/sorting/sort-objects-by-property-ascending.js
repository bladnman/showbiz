'use strict';
module.exports = function sortObjectsByPropertyAscending (objects, prop) {
	return objects.sort( (a, b) => a[prop] - b[prop] );
};
