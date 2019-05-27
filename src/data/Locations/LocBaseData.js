/**
 * LocBaseData.js by zhongz132@gmail.com
 *
 * Location for the base (no parent)
 */

import Location from "./Location.js";
import LocId from "./LocIdGen.js";

var LocBaseData = {};

LocBaseData[LocId.genId(["World"])] = new Location({
	order: 0,
	time: 10,
	//children: Object.keys(LocWorldData),
	name: "Map",
	about: "The map of the Frajen island."
});
LocBaseData[LocId.genId(["Spar"])] = new Location({
	order: 1,
	time: 5,
	name: "Spar",
	about: "Practice against your opponent."
});
LocBaseData[LocId.genId(["Battle"])] = new Location({
	order: 2,
	time: 10,
	name: "Battle",
	about: "Fight your opponent to the death."
});

for (var key in LocBaseData) {
	LocBaseData[key] = LocBaseData[key].set("locId", key)
}

export default LocBaseData;
