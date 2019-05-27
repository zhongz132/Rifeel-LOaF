/**
 * SBState.js by zhongz132@gmail.com
 *
 * Declaration for the spar and battle state.
 */

import Immutable from "immutable";

const SBState = Immutable.Record({
	type: undefined,
	turn: 0,

	playerHp: 0,
	playerEnergy: 0,
	playerStatus: [],
	playerSkill: [],
	playerPassive: [],
	playerAtk: 0,
	playerDef: 0,
	playerAgi: 0,
	playerInt: 0,
	playerUsedUndying: false,

	oppHp: 0,
	oppEnergy: 0,
	oppStatus: [],
	oppSkill: [],
	oppPassive: [],
	oppLogic: "",
	oppAtk: 0,
	oppDef: 0,
	oppAgi: 0,
	oppInt: 0,
	oppUsedUndying: false,

	endResult: undefined
});

export default SBState;