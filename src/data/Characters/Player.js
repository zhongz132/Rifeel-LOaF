/**
 * Character.js by zhongz132@gmail.com
 * 
 * Declaration of the player element in the game
 */

import Immutable from "immutable";
import SkillNames from "./../Skills/SkillNames.js";

const Player = Immutable.Record({
	health: 1.00, // How healthy the player is

	cst: 100, // Constitution (HP)
	atk: 100, // Attack (ATK Power)
	def: 100, // Defense (DEF Power)
	agi: 100, // Agility (Speed)
	int: 100, // Intelligence (Special)

	inf: 0, // Influence
	rep: 10, // how good the player is percieved as. Negative is evil

	passive: [], // passive skills
	skill: SkillNames.BASIC, // active skills
	inventory: [], // inventory
})

export default Player;