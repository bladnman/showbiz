'use strict';
const isNoE = require('./object-utils/isNoE');
const isFunction = require('./type-utils/isFunction');

module.exports = function breath (thenExecute) {
	var forMillsOrNull			= 10;
	/**
	Odd interface. This will breath for a few mills by default,
	or allow you to send in the mills to breath for.

	This can be called like this:
	breath(function)
	- or -
	breath(mils, function)
	- or -
	breath(function, mils)

	This function will figure out which you mean.
	*/

	var argsArray 				= [].slice.apply(arguments);

	if ( argsArray.length < 1 ) {
		return;
	}

	if ( argsArray.length === 1 ) {
		thenExecute				= argsArray[0];
	}

	else if ( argsArray.length === 2 ) {
		forMillsOrNull			= argsArray[0];
		thenExecute				= argsArray[1];
	}

	// get the parms straightened out
	// this allows for (func,int) and (int,func)
	if ( isFunction(forMillsOrNull) ) {
		var tmp = thenExecute || null;
		thenExecute		= forMillsOrNull;
		forMillsOrNull	= tmp;
	}

	// bail -- we have NO FUNCTIONS
	if ( ! isFunction(thenExecute) && ! isFunction(forMillsOrNull) ) {
		return null;
	}

	var breathForMills				= forMillsOrNull || 10;
	if ( ! isNoE(thenExecute) ) {

		// if the timeout is 0 then execute immediately
		if ( breathForMills < 1 ) {
			thenExecute();
		}

		else {
			return setTimeout(thenExecute, breathForMills);
		}
	}

	return null;
};
