/**
 * Location.js by zhongz132@gmail.com
 *
 * Declaration of location element in the game
 */

import Immutable from "immutable";

const Location = Immutable.Record({
	locId: "", // Location Id, CIRTICAL WARNING: UNIQUE
	order: 999999, //
	time: 1,

	parent: "", // Parent location
	children: [], // List of locations which are accesible from current location
	characters: [], // List of characters which are available to interact with

	name: "", // Name of the location or scenario
	about: "", // Short description of the location
	validReq: [], // Requirements for this to be valid. Only need one in the list to be true
	hint: "", // Hint on how to unlock location if invalid
});

export default Location;
