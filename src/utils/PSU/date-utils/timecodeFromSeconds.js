'use strict';
module.exports = function timecodeFromSeconds (inSeconds, includeFrames) {
	var seconds = inSeconds;
	if ( seconds === null ) {
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

		var hours = Math.floor(seconds / (60*60));
		seconds   = seconds - (hours * 60 * 60);

		var mins  = Math.floor(seconds / 60);
		seconds   = Math.floor(seconds - (mins * 60));

		// addLeadZero
		var alz = function (value) {
			value = value || 0;
			return ( value < 10 ) ? ('0' + value) : value;
		}

		var outString = alz(hours)    + ':' +
		alz(mins)     + ':' +
		alz(seconds);
		if ( includeFrames ) {
			outString   += ":00";
		}

		return outString;
	} catch (ex) {}

	return null;
};
