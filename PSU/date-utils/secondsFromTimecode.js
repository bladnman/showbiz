'use strict';
module.exports = function secondsFromTimecode (timecode) {
	if ( !timecode ) {
		return null;
	}
	/**
	* TIMECODE INFO
	*
	* Timecodes are multi-part time values
	*    ex: 01:02:03:04
	*
	* Format
	*    hrs:min:sec:frames
	*
	*/
	try {
		var parts = timecode.split(':');

		// timecode without frames
		if ( parts.length === 3 ) {
			parts.push('00');
		}

		if ( parts.length === 4 ) {
			return (parts[0] * 60 * 60) + (parts[1] * 60) + (parts[2] * 1);
		}
	} catch (ex) {}

	return null;
};
