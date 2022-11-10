'use strict';
const isNoE = require('../object-utils/isNoE');

module.exports = function replaceFor (string, lookFor, replaceWith) {
	if ( typeof string === 'undefined' ) {
		return null;
	}
	if ( string == null ) {
		return null;
	}
	if ( string === '' ) {
		return '';
	}
	if ( typeof string !== 'string' ) {
		return null;
	}

	// bad lookfor
	if ( isNoE(lookFor) ) {
		return string;
	}

	// bad replaceWith
	if ( isNoE(replaceWith) ) {
		replaceWith				= '';
	}


	if ( lookFor === replaceWith ) {
		return string;
	}

	var inText 		= string,
	outText 		= '',
	holdText 	= '',
	foundCount 	= 0,
	theSpot		= -1;
	while (inText.indexOf(lookFor) > -1) {
		foundCount++;
		theSpot  = inText.indexOf(lookFor);

		if (outText.length > 0 || foundCount > 1) {
			outText += replaceWith + inText.substring(0, theSpot);
		}
		else {
			outText = inText.substring(0,theSpot);
		}

		holdText 	= inText.substring(theSpot+lookFor.length,inText.length);
		inText  		= holdText;
	}
	if (foundCount > 0) {
		outText  += replaceWith + inText;
	}

	else {
		outText = inText;
	}
	return outText;
};
