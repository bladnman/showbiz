'use strict';
module.exports = function getVal (item, field) {
	/**
	* This is a helper function to get a value from an object
	* that will use the 'Ember' get() mechanism if available or
	* do a direct map if not. It should allow tests here to be
	* written agnostic of the implementation. It can also be
	* extended for other types in the future.
	*
	* @param item
	* @param field
	* @returns {*}
	*/
	if ( !item || !field ) {
		return null;
	}

	if ( item.get ) {
		return item.get(field);
	}

	return item[field];
};
