/**
 * Util.js by zhongz132@gmail.com
 *
 * Utility functions useful for all objects.
 */
import {GameData, GameNames} from "./../Data.js";
const Util = {
	_idExists: function(id) {
		if (id in GameData) return true;
		return false;
	},

	_LocExists: function(id) {
		if (id in GameNames.Location) return true;
		return false;
	},

	_EleExists: function(id) {
		if (id in GameNames.Element) return true;
		return false;
	}
};

export default Util;
