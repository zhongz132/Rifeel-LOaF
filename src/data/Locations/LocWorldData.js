/**
 * LocWorldData.js by zhongz132@gmail.com
 *
 * Location for the world (parent = world)
 */

import LocId from "./LocIdGen.js";
import Location from "./Location.js";

var LocWorldData = {};

LocWorldData[LocId.genId(["World", "Lian"])] = new Location({
	order: 10,
	time: 0,
	name: "Lian",
	about: "A town bordering the ocean to the north. Currently under the jurisdiction of the Tareinan empire."
});
LocWorldData[LocId.genId(["World", "ForestLian"])] = new Location({
	order: 16,
	time: 0,
	name: "Woods",
	about: "The woods just east of Lian."
});
LocWorldData[LocId.genId(["World", "Road"])] = new Location({
	order: 18,
	time: 0,
	name: "Road",
	about: "The grand road connecting the cities and towns of the Tareinan empire."
});
LocWorldData[LocId.genId(["World", "Marpen"])] = new Location({
	order: 20,
	time: 0,
	name: "Marpen",
	about: "The Tareinan city south-east of Lian, which connects to the capital, Tarein."
});
LocWorldData[LocId.genId(["World", "Tarein"])] = new Location({
	order: 30,
	time: 0,
	name: "Tarein",
	about: "The capital city in the center of Frajen, Tarein."
});
LocWorldData[LocId.genId(["World", "Pativeel"])] = new Location({
	order: 61,
	time: 0,
	name: "Pativeel",
	about: "An independent city south-west of Tarein, which borders the Kimal Forest"
});

LocWorldData[LocId.genId(["World", "ForestTarein"])] = new Location({
	order: 51,
	time: 0,
	name: "Kimal Forest",
	about: "The massive forest which occupies the entire southern portion of Frajen."
});

LocWorldData[LocId.genId(["World", "Ending"])] = new Location({
	order: 200,
	time: 0,
	name: "???",
	about: "Where are you?"
});

export default LocWorldData;
