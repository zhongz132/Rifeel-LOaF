/**
 * PGenGameId.js by zhongz132@gmail.com
 *
 * Generate new game Ids.
 */

const GenGameId = function() {
	let d = new Date();

	// This is garunteed unique, unless we create multiple games within the same millisecond.
	return d.valueOf().toString() + Math.floor(1000*Math.random()).toString();
};

export default GenGameId;