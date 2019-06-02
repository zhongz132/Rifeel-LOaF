/**
 * Game.js by zhongz132@gmail.com
 *
 * Stores all data for the game.
 */

/**
 * The prefix for the different game objects, as well as their subtypes.
 */
export const _prefix = {
	Location: "LOC",
	Element: "ELE",
	Interaction: "INT",
	Item: "ITM",
	Passive: "PAS",
	Skill: "SKL",
	Type: "TYP",
	Logic: "LGC"
};

export const _interactionPrefix = {
	Talk: "TLK",
	Learn: "LRN",
	Quest: "QST",
	Spar: "SPR",
	Battle: "BTL",
	Trade: "TRD"
};

export const _itemPrefix = {
	Weapon: "WPN",
	Armor: "AMR",
	Quest: "QST",
	Other: "OTH"
};

export const _skillPrefix = {
	Attack: "ATK",
	Defense: "DEF",
	Agility: "AGI",
	Other: "OTH"
};

export const _prefixToName = {
	LOC: "Location",
	ELE: "Element",
	INT: "Interaction",
	ITM: "Item",
	PAS: "Passive",
	SKL: "Skill",
	TYP: "Type",
	LGC: "Logic",
	TLK: "Talk",
	LRN: "Learn",
	QST: "Quest",
	SPR: "Spar",
	BTL: "Battle",
	TRD: "Trade",
	WPN: "Weapon",
	AMR: "Armor",
	OTH: "Other",
	ATK: "Attack",
	DEF: "Defense",
	AGI: "Agility"
}

/**
 * The names of each of the game objects. We keep these as there are many situations where we only need
 * a certain type of object, and looping through all objects in GameData in expensive.
 * Segements created by the searchable segmenets.
 */
export const GameNames = {
	Locations: {},
	Elements: {},
	Interactions: {
		Talk: {},
		Learn: {},
		Quest: {},
		Spar: {},
		Battle: {},
		Trade: {}
	},
	Items: {
		Weapon: {},
		Armor: {},
		Quest: {},
		Other: {}
	},
	Passives: {},
	Skills: {
		Attack: {},
		Defense: {},
		Agility: {},
		Other: {}
	},
	Types: {},
	Logic: {}
};

/**
 * Stores a map from a object id to the object itself.
 */
export var GameData = {};
