/**
 * LocLianData.js by zhongz132@gmail.com
 *
 * Information about Lian (parent=Lian)
 */

import LocId from "./LocIdGen.js";
import Location from "./Location.js";

var LocLianData = {};

LocLianData[LocId.genId(["World", "Lian", "Home"])] = new Location({
	order: 10,
	name: "Home",
	about: "Home sweet home.",
	characters: ["World_Lian_Home_Mom", "World_Lian_Home_Dad"]
});

// Strength based locations
LocLianData[LocId.genId(["World", "Lian", "Dojo"])] = new Location({
	order: 11,
	name: "Dojo",
	about: "A dojo in the town of Lian.",
	characters: [
		"World_Lian_Dojo_StudentAtk",
		"World_Lian_Dojo_StudentDef",
		"World_Lian_Dojo_StudentAgi",
		"World_Lian_Dojo_Teacher"
	]
});

// Intelligence based locations
LocLianData[LocId.genId(["World", "Lian", "School"])] = new Location({
	order: 12,
	name: "School",
	about: "A school in the town of Lian.",
	characters: [
		"World_Lian_School_StudentInf",
		"World_Lian_School_StudentInt",
		"World_Lian_School_Teacher"
	]
});

// Charisma based locations
LocLianData[LocId.genId(["World", "Lian", "Hall"])] = new Location({
	order: 13,
	name: "Town Hall",
	about: "The town hall of Lian.",
	characters: [
		"World_Lian_Hall_Messenger",
		"World_Lian_Hall_Guard",
		"World_Lian_Hall_Sheriff",
		"World_Lian_Hall_Chief"
	]
});

// Gold based locations
LocLianData[LocId.genId(["World", "Lian", "Shop"])] = new Location({
	order: 14,
	name: "Shop",
	about: "A shop in the town of Lian.",
	characters: [
		"World_Lian_Shop_Customer",
		"World_Lian_Shop_Storekeeper"
	]
});

// City center and outside
LocLianData[LocId.genId(["World", "Lian", "Center"])] = new Location({
	order: 15,
	name: "Town Center",
	about: "The town center of Lian.",
	characters: [
		"World_Lian_Center_CrazyOldMan"
	]
});

export default LocLianData;
