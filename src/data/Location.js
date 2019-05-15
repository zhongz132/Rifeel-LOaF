import Immutable from "immutable";

const Location = Immutable.Record({
	locId: -1, // Location Id, CIRTICAL WARNING: UNIQUE

	name: '', // Name of the location or scenario
	about: '', // Short description of the location

	characters: [], // List of characters which are available to interact with

	locations: [], // List of locations which are accesible from current location

});

export default Location