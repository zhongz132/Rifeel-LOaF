/**
 * LocTareinData.js by zhongz132@gmail.com
 *
 * Location information for Tarein (parent=Tarein)
 */

import LocId from "./LocIdGen.js";
import Location from "./Location.js";

var LocTareinData = {}

// Strength based locations
LocTareinData[LocId.genId(["World", "Tarein", "Dojo"])] = new Location({
	order: 31,
	name: "Dojo",
	about: "A dojo in Tarein."
});
LocTareinData[LocId.genId(["World", "Tarein", "Barracks"])] = new Location({
	order: 32,
	validReq: [{ loc: ["Lian_scene_str1"] }, { loc: ["Lian_scene_str2"] }, { str: 220 }],
	name: "Barracks",
	about: "The barracks in Tarein.",
	hint: "Increase strength or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Camp"])] = new Location({
	order: 33,
	name: "Army Camp",
	about: "The base army camp in Tarein.",
	hint: "Increase strength or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Assasin"])] = new Location({
	order: 34,
	name: "Assasin's Guild",
	about: "The assasin's guild in Tarein. Hire assasins, take missions, or train skills."
});

// Intelligence based locations
LocTareinData[LocId.genId(["World", "Tarein", "School"])] = new Location({
	order: 35,
	name: "School",
	about: "A school in Tarein."
});
LocTareinData[LocId.genId(["World", "Tarein", "Uni"])] = new Location({
	order: 36,
	validReq: [{ loc: ["Lian_scene_int1"] }, { loc: ["Lian_scene_int2"] }, { int: 220 }],
	name: "University",
	about: "The university in Tarein.",
	hint: "Increase intelligence or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Hospital"])] = new Location({
	order: 37,
	name: "Hospital",
	about: "The hospital in Tarein. Learn to heal and the basics of human anatomy.",
	hint: "Increase intelligence or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Lab"])] = new Location({
	order: 38,
	name: "Lab",
	about: "The underground lab in Tarein. Delves in miltary science, human experimentation, and others."
});

// Charisma based locations
LocTareinData[LocId.genId(["World", "Tarein", "Hall"])] = new Location({
	order: 39,
	name: "City Hall",
	about: "The city hall of Tarein."
});
LocTareinData[LocId.genId(["World", "Tarein", "Court"])] = new Location({
	order: 40,
	validReq: [{ loc: ["Lian_scene_cha1"] }, { loc: ["Lian_scene_cha2"] }, { cha: 220 }],
	name: "Courthouse",
	about: "The courhouse in Tarein",
	hint: "Increase charisma or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Palace"])] = new Location({
	order: 41,
	name: "Palace",
	validReq: null, //TODO
	about: "The palace of Ysvan Tarein, the lord of Tarein.",
	hint: "Increase charsima or influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Society"])] = new Location({
	order: 42,
	validReq: null, //TODO
	name: "Secret Society",
	about: "The underground secret society of Tarein."
});

// Gold based locations
LocTareinData[LocId.genId(["World", "Tarein", "Shop"])] = new Location({
	order: 43,
	name: "Shop",
	about: "A shop in Tarein"
});
LocTareinData[LocId.genId(["World", "Tarein", "Auction"])] = new Location({
	order: 44,
	name: "Auction House",
	validReq: [{ loc: ["Lian_scene_gold2"] }, { gold: 1000 }],
	about: "The auction house in Tarein.",
	hint: "Pay or increase influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "Merchant"])] = new Location({
	order: 45,
	name: "Merchant Guild",
	about: "The merchants guild in Tarein.",
	hint: "Pay or increase influence to unlock. Can also unlock through scenarios."
});
LocTareinData[LocId.genId(["World", "Tarein", "BlackMarket"])] = new Location({
	order: 46,
	name: "Black Market",
	about: "The black market in Tarein."
});

// City center and outside
LocTareinData[LocId.genId(["World", "Tarein", "Center"])] = new Location({
	order: 50,
	name: "City Center",
	about: "The city center of Tarein."
});

// Tarein Scenarios
LocTareinData[LocId.genId(["World", "Tarein", "scene-str0"])] = new Location({
	order: 201,
	validReq: [{ curMonth: 1, loc: ["World_Tarein"] }],
	name: "Fighting Competition",
	about: "The city is hosting its annual fighting competition.",
	hint: "Begins the first month of the year"
});
LocTareinData[LocId.genId(["World", "Tarein", "scene-int0"])] = new Location({
	order: 202,
	validReq: [{ curMonth: 5, loc: ["World_Tarein"] }],
	name: "Research Conference",
	about: "The city is hosting its annual research conference.",
	hint: "Begins the fifth month of the year"
});
LocTareinData[LocId.genId(["World", "Tarein", "scene-cha0"])] = new Location({
	order: 203,
	validReq: [{ curMonth: 10, loc: ["World_Tarein"] }],
	name: "Political Debate",
	about: "The city is hosting its annual political debate.",
	hint: "Begins the tenth month of the year"
});

export default LocTareinData;
