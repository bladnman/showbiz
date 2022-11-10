'use strict';
const isDate = require('../type-utils/isDate');

module.exports = function dateFromISO (str) {
	if ( ! str ) {
		return null;
	}
	if ( isDate(str) ) {
		return str;
	}
	if ( ! str.length || str.length < 1 ) {
		return null;
	}
	str = str.split(/\D/);
	return new Date(str[0], --str[1]||'', str[2]||'', str[3]||'', str[4]||'', str[5]||'', str[6]||'');
};
