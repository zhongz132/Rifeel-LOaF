/**
 * GameBase.js by zhongz132@gmail.com
 *
 * The state of every new game.
 */

import Immutable from "immutable";

const NewGame = Immutable.Record({
	// Keep track of the current game data
	gameVersionCheckSum: 0,
	gameInfoCheckSum: 0,
	gameId: "0",
	gameName: "QuickSave",

	// Keep track of the views
	curLocation: "LOC_HOME",
	curElement: "",
	curPlayerView: "",

	// Keep track of spar and battle state
	curFight: undefined,

	// The player personal and quest info.
	health: 1.0,
	gold: 0,
	cst: 100,
	atk: 100,
	def: 100,
	agi: 100,
	int: 100,
	inf: 0,
	rep: 20,
	skills: [],
	passives: [],
	inventory: [],
	equips: [],
	questsActive: [],
	questsDone: []
});

export default NewGame;