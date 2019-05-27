/**
 * CombatLogic.js by zhongz132@gmail.com
 *
 * The opponents combat logic. Will output a move
 */

import CombatLogicNames from "./CombatLogicNames.js";
import CLBasic from "./CLBasic.js";

function CombatLogic(SBState, SkillData, playerSkillId) {
	switch (SBState.oppLogic) {
		case CombatLogicNames.BASIC:
			return CLBasic(SBState, SkillData, playerSkillId);
		default:
			console.log("CRITICAL ERROR: Undefined player logic: ", SBState.oppLogic);
			console.log(SBState.oppSkill[1])
			return SBState.oppSkill[1];
	}
}

export default CombatLogic;
