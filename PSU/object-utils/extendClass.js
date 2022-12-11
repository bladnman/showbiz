'use strict';
module.exports = function extendClass (ChildClass, ParentClass) {
	if ( ! ChildClass ) {
		return null;
	}

	if ( ! ParentClass ) {
		return ChildClass;
	}


	var _super 							= new ParentClass();
	ChildClass.prototype 				= _super;
	//noinspection JSUnusedGlobalSymbols
	ChildClass.prototype.constructor 	= ChildClass;		// jshint ignore:line
	ChildClass.prototype._super 		= _super;
	return ChildClass;
};
