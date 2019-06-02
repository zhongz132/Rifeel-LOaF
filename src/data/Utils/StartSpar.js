/**
 * StartSpar.js by zhongz132@gmail.com
 *
 * Starts the spar
 */

import SBState from "./SBState";
import SkillNames from "./../Skills/SkillNames.js";

function parseSkill(skill1) {
	let newSkillList = [];
	let skill = [...skill1]
	for (let i in skill) {
		if (typeof skill[i] === "object") {
			for (let j in skill[i]) {
				if (!newSkillList.includes(skill[i][j])) {
					newSkillList.push(skill[i][j]);
				}
			}
		} else if (typeof skill[i] === "string") {
			if (!newSkillList.includes(skill[i])) {
				newSkillList.push(skill[i]);
			}
		}
	}
	console.log("newskilllist: ", newSkillList)
	return newSkillList;
}

function passiveBonus(state, passives1) {
	let passiveEffects = { cst: 0.0, atk: 0.0, def: 0.0, agi: 0.0, int: 0.0, energy: 0, status: [], named: [] };
	let passives = [...passives1]
	console.log(passives);
	for (var passive in passives) {
		let bonus = state.SkillData[passives[passive]].bonus;
		for (var bonusKey in bonus) {
			console.log("Checking that status bonuskey works: ", bonusKey);
			if (bonusKey === "status") {
				passiveEffects.status.push(bonus[bonusKey]);
			} else {
				passiveEffects[bonusKey] += bonus[bonusKey];
			}
		}
	}
	if (passives.includes(SkillNames.PAS_FATED) && state.curLoc === "Battle") {
		passiveEffects.named.push(SkillNames.PAS_FATED);
	}
	if (passives.includes(SkillNames.PAS_UNDYING) && state.curLoc === "Battle") {
		passiveEffects.named.push(SkillNames.PAS_UNDYING);
	}

	return passiveEffects;
}

export default function StartSpar(state) {
	let player = state.player;
	let opp = state.CharData[state.curChar];
	let playerPassEffects = passiveBonus(state, player.passive);
	let oppPassEffects = passiveBonus(state, opp.passive);

	return new SBState({
		type: "Spar",
		playerHp: Math.round(player.cst * (1 + playerPassEffects.cst) * player.health),
		playerEnergy: Math.round(playerPassEffects.energy),
		playerStatus: playerPassEffects.status,
		playerSkill: parseSkill(player.skill),
		playerPassive: player.passive.filter(
			passive => passive !== SkillNames.PAS_FATED && passive !== SkillNames.PAS_UNDYING
		),
		playerAtk: Math.round(player.atk * (1 + playerPassEffects.atk) * player.health) + 1000,
		playerDef: Math.round(player.def * (1 + playerPassEffects.def) * player.health),
		playerAgi: Math.round(player.agi * (1 + playerPassEffects.agi) * player.health),
		playerInt: Math.round(player.int * (1 + playerPassEffects.int) * player.health),

		oppHp: Math.round(opp.cst * (1 + oppPassEffects.cst)),
		oppEnergy: Math.round(oppPassEffects.energy),
		oppStatus: oppPassEffects.status,
		oppSkill: parseSkill(opp.skill).filter(
			skill => skill !== SkillNames.SPE_ESCAPE && skill !== SkillNames.SPE_INTIMIDATE
		),
		oppPassive: opp.passive.filter(
			passive => passive !== SkillNames.PAS_FATED && passive !== SkillNames.PAS_UNDYING
		),
		oppLogic: opp.logic,
		oppAtk: Math.round(opp.atk * (1 + oppPassEffects.atk)),
		oppDef: Math.round(opp.def * (1 + oppPassEffects.def)),
		oppAgi: Math.round(opp.agi * (1 + oppPassEffects.agi)),
		oppInt: Math.round(opp.int * (1 + oppPassEffects.int))
	});
}
