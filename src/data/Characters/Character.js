/**
 * Character.js by zhongz132@gmail.com
 *
 * Declaration of character element in the game
 */

import Immutable from "immutable";

const Character = Immutable.Record({
	charId: "", // Character Id, CRITICAL WARNING UNIQUE!

	name: "BaseChar", // Name of the character
	about: "BaseAbout", // Description of the chracter

	talk: [], // the dialogs which appear when the player talks with the character
	interact: {}, // ways to interact

	cst: 100, // Constitution (HP)
	atk: 100, // Attack (ATK Power)
	def: 100, // Defense (DEF Power)
	agi: 100, // Agility (Speed)
	int: 100, // Intelligence (Special)
	passive: [],
	skill: [],
	logic: "",

	inf: 0, // influence of the character

	validReq: [], // availbility requirements

	doneReq: []
});

export default Character;
