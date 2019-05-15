import Immutable from "immutable";

const Character = Immutable.Record({
	charId: -1, // Character Id, CRITICAL WARNING UNIQUE!

	name: "", // Name of the character
	about: '', // Description of the chracter
	talk: {}, // the dialogs which appear when the player talks with the character
	interact: {}, // ways to interact

	aff: 0, // affinity to the player (99999 if player)

	hlt: 0, // Health of the character (max 100, 0 is dead)
	str: 0, // fighting ability of the character
	int: 0, // intelligence of the character
	cha: 0, // charisma of the character
	inf: 0, // influence of the character

	avail: false // is this character available to the player?
});

export default Character;
