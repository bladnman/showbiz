'use strict';
module.exports = function setVal (item, field, value) {
	/**
	* This is a helper function to set a value from an object
	* that will use the 'Ember' set() mechanism if available or
	* do a direct set if not. It should allow tests here to be
	* written agnostic of the implementation. It can also be
	* extended for other types in the future.
	*
	* @param item
	* @param field
	* @returns {*}
	*/
	if ( !item || !field ) {
		return;
	}

	if ( item.set ) {
		item.set(field, value);
	}

	else {
		item[field] = value;
	}
};
