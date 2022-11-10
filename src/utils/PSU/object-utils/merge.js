'use strict';
const isArray = require('../type-utils/isArray');
const isObject = require('../type-utils/isObject');

/**
 * @memberof module:PSU
 * @method merge
 * @param  {object} root - Object to merge onto
 * @return {object}
 */
module.exports = function merge (root) {

	if (arguments.length < 1) {
		return null;
	}
	root		= root || {};

	// GO THROUGH EACH OBJECT SENT TO US
	// starting at 1 to skip 'root'
	for ( var i = 1; i < arguments.length; i++ ) {

		var objectToTakeFrom	= arguments[i];

		// ONLY WORK ARRAYS AND OBJECTS
		if ( isObject(objectToTakeFrom) || isArray(objectToTakeFrom) ) {
			// GET THE PROPERTIES FROM THIS OBJECT
			for ( var key in objectToTakeFrom ) {

				// IF THIS PROPERTY IS OWNED BY THIS OBJECT
				if ( objectToTakeFrom.hasOwnProperty(key)) {

					var propertyToMerge	= objectToTakeFrom[key];
					var propertyOnRoot	= root[key] || null;

					// ROOT DOES NOT HAVE THIS PROPERTY - move it over entirely
					// allow null value to be moved over
					if ( propertyOnRoot === null || propertyToMerge === null || typeof propertyToMerge !== 'object') {
						root[key] = propertyToMerge;
					}

					// NON-OBJECT OR ARRAY -- overwrite entirely
					else if ( isArray(propertyToMerge) || typeof propertyToMerge !== 'object') {
						root[key] = propertyToMerge;
					}

					// EMPTY OBJECT
					// odd scenario where if given an empty object {} we were skipping it all
					else if ( typeof propertyToMerge === 'object' && Object.keys(propertyToMerge).length < 1) {
						root[key] = merge({}, propertyToMerge);
					}

					// ROOT ALREADY HAS A PROPERTY WITH THIS NAME
					// NON-EMPTY OBJECT
					// deep merge to maintain as much data as possible
					else {
						root[key] = merge({}, propertyOnRoot, propertyToMerge);
					}
				}
			}
		}

	}
	return root;
};
