/**
 * ProcessSkill.js by zhongz132@gmail.com
 *
 * Processes a skill in spar or battle mode.
 */

import SkillNames from "./../Skills/SkillNames.js";
import CombatLogic from "./../CombatLogic/CombatLogic.js";

/**
 * Winner types:
 * None: No one wins
 * Both: Both win
 * Player: Player wins
 * Opp: Opponent wins
 * PlayerAgi: Player is scraped, takes half dmg and no effects; applies full dmg and effect to opp
 * OppAgi: Opponent is scraped, takes half dmg and no effects; applies full dmg and effect to player
 * PlayerPartial: Player deals half dmg no effects, takes no dmg/effects
 * OppPartial: Opp deals half dmg no effects, takes no dmg/effects
 */

/*
return{
text: "....",
end: "",
player: {hp: +-, energy +-, removeSelfStat, gainSelfStat},
opp: {hp: +-, energy+-, removeSelfStat, gainSelfStat},
}
*/

function CalcWinner(SBState, playerSkill, playerBonus, playerType, oppSkill, oppBonus, oppType) {
	function _winnerEffect(winner) {
		function __calcOnEffect(effects, who) {
			for (let key in effects) {
				switch (key) {
					case "text":
						if (who === "Player") player["sysText"] = effects[key];
						else if (who === "Opp") opp["sysText"] = effects[key];
						break;
					case "dmg":
						if (who === "Player") opp["hp"] -= (playerAtk - oppDef) * effects[key];
						else if (who === "Opp") player["hp"] -= (oppAtk - playerDef) * effects[key];
						break;
					case "status":
						if (who === "Player") {
							for (let i in effects[key]) {
								opp["status"].push(effects[key][i]);
							}
						} else if (who === "Opp") {
							for (let i in effects[key]) {
								player["status"].push(effects[key][i]);
							}
						}
						break;
					case "selfstatus":
						if (who === "Player") {
							for (let i in effects[key]) {
								player["status"].push(effects[key][i]);
							}
						} else if (who === "Opp") {
							for (let i in effects[key]) {
								opp["status"].push(effects[key][i]);
							}
						}
						break;
					case "steal":
						if (who === "Player") {
							let energyStolen = Math.min(effects[key], SBState.oppEnergy);
							player["energy"] += energyStolen;
							opp["energy"] -= energyStolen;
						} else if (who === "Opp") {
							let energyStolen = Math.min(effects[key], SBState.playerEnergy);
							opp["energy"] += energyStolen;
							player["energy"] -= energyStolen;
						}
						break;
					case "energy":
						if (who === "Player") player["energy"] += effects[key];
						else if (who === "Opp") opp["energy"] += effects[key];
						break;
					case "remove":
						if (who === "Player") {
							for (let i in effects[key]) {
								player["removeStatus"].push(effects[key][i]);
							}
						} else if (who === "Opp") {
							for (let i in effects[key]) {
								opp["removeStatus"].push(effects[key][i]);
							}
						}
						break;
					case "heal":
						if (who === "Player") player["hp"] += playerInt * effects[key];
						else if (who === "Opp") opp["hp"] += playerInt * effects[key];
						break;
					case "end":
						if (who === "Player") player["end"] = effects[key];
						if (who === "Opp") opp["end"] = effects[key];
						break;
					default:
						console.log("Error: Invalid effects key, ", key);
				}
			}
		}

		let player = {
			sysText: "",
			hp: 0,
			energy: 0,
			status: [],
			removeStatus: []
		};
		let opp = {
			sysText: "",
			hp: 0,
			energy: 0,
			status: [],
			removeStatus: []
		};

		switch (winner) {
			case "None":
				__calcOnEffect(playerSkill.onFail, "Player");
				__calcOnEffect(oppSkill.onFail, "Opp");
				break;
			case "Both":
				__calcOnEffect(playerSkill.onSuccess, "Player");
				__calcOnEffect(oppSkill.onSuccess, "Opp");
				break;
			case "Player":
				__calcOnEffect(playerSkill.onSuccess, "Player");
				__calcOnEffect(oppSkill.onFail, "Opp");
				break;
			case "Opp":
				__calcOnEffect(playerSkill.onFail, "Player");
				__calcOnEffect(oppSkill.onSuccess, "Opp");
				break;
			case "PlayerAgi":
				__calcOnEffect(playerSkill.onSuccess, "Player");
				opp["sysText"] = oppSkill.onFail.text;
				if (oppSkill.onSuccess.dmg) {
					player["hp"] -= (oppAtk - playerDef) * oppSkill.onSuccess.dmg * (oppAgi / playerAgi) * 0.5;
					opp["sysText"] = "You scrape your opponent.";
				}
				break;
			case "OppAgi":
				player["sysText"] = playerSkill.onFail.text;
				__calcOnEffect(oppSkill.onSuccess, "Opp");
				if (playerSkill.onSuccess.dmg) {
					opp["hp"] -= (playerAtk - oppDef) * playerSkill.onSuccess.dmg * (playerAgi / oppAgi) * 0.5;
					player["sysText"] = "You scrape your opponent.";
				}
				break;
			case "PlayerPartial":
				player["sysText"] = playerSkill.onFail.text;
				opp["sysText"] = oppSkill.onFail.text;
				if (playerSkill.onSuccess.dmg) {
					opp["hp"] -= (playerAtk - oppDef) * playerSkill.onSuccess.dmg * (oppAgi / playerAgi) * 0.5;
					player["sysText"] = "You scrape your opponent.";
				}
				break;
			case "OppPartial":
				player["sysText"] = playerSkill.onFail.text;
				opp["sysText"] = oppSkill.onFail.text;
				if (oppSkill.onSuccess.dmg) {
					player["hp"] -= (oppAtk - playerDef) * oppSkill.onSuccess.dmg * (playerAgi / oppAgi) * 0.5;
					opp["sysText"] = "You scrape your opponent.";
				}
				break;
			default:
				console.log("Error: Invalid winner type, ", winner);
		}

		return {
			winnerType: winner,
			player: player,
			opp: opp,
			faster: playerAgi > oppAgi ? "Player" : "Opp"
		};
	}

	let playerAtk = SBState.playerAtk * playerBonus.atk;
	let playerDef = SBState.playerDef * playerBonus.def;
	let playerAgi = SBState.playerAgi * playerBonus.agi;
	let playerInt = SBState.playerInt * playerBonus.int;
	let oppAtk = SBState.oppAtk * oppBonus.atk;
	let oppDef = SBState.oppDef * oppBonus.def;
	let oppAgi = SBState.oppAgi * oppBonus.agi;
	let oppInt = SBState.oppInt * oppBonus.int;

	// Berserk state
	if (SBState.playerStatus.includes("Berserk")) {
		playerAtk *= 2.0;
		playerDef *= 0.0;
		playerAgi *= 2.0;
		playerInt *= 0.0;
	}

	if (SBState.oppStatus.includes("Berserk")) {
		oppAtk *= 2.0;
		oppDef *= 0.0;
		oppAgi *= 2.0;
		oppInt *= 0.0;
	}

	// Focus state ( Not much focus in a berserk state LOL )
	if (SBState.playerStatus.includes("Focus")) {
		playerAtk += playerInt;
		playerDef += playerInt;
		playerAgi += playerInt;
	}

	if (SBState.oppStatus.includes("Focus")) {
		oppAtk += oppInt;
		oppDef += oppInt;
		oppAgi += oppInt;
	}

	console.log("Player Stats:", playerAtk, playerDef, playerAgi);
	console.log("Opp Stats:", oppAtk, oppDef, oppAgi);

	// Check stuns
	if (playerType === "STUNNED") {
		if (oppType === "STUNNED") return _winnerEffect("None");
		if (oppType === "DEF") return _winnerEffect("None");
		if (oppType === "SPE") return _winnerEffect("Opp");
	}
	if (oppType === "STUNNED") {
		if (playerType === "DEF") return _winnerEffect("None");
		if (playerType === "SPE") return _winnerEffect("Player");
	}

	// Check type absolutes
	if (playerType === "DEF" && oppType === "DEF") return _winnerEffect("None");
	if (playerType === "DEF" && oppType === "SPE") return _winnerEffect("Opp");
	if (playerType === "SPE" && oppType === "DEF") return _winnerEffect("Player");
	if (playerType === "SPE" && oppType === "SPE") return _winnerEffect("Both");

	// Check escapes
	if (playerSkill.name === "Escape") {
		if (playerAgi + playerInt > oppAgi + Math.max(SBState.oppInt, oppInt)) return _winnerEffect("Player");
	}

	if (oppSkill.nName === "Escape") {
		if (oppAgi + oppInt > playerAgi + Math.max(SBState.playerInt, playerInt)) return _winnerEffect("Opp");
	}

	// Defense for player
	if (playerType === "DEF" || playerType === "STUNNED") {
		// Opp has ignore defense
		if (oppBonus.ignore) {
			if (oppBonus.ignore === "DEF") {
				// However, the ability is dodged by player
				if (playerAgi > oppAgi * 2) return _winnerEffect("Player");
				// Can not partial dodge an ignore defense ability. Opp wins
				playerDef = 0.0;
				return _winnerEffect("Opp");
			}
		}
		// Opp attack will defintely pierce the player defense
		if (oppAtk > playerDef) {
			// However, true dodge by player
			if (playerAgi > oppAgi * 2) return _winnerEffect("Player");
			// However, parital dodge by player
			if (playerAgi > oppAgi * 1.5) return _winnerEffect("PlayerAgi");
			// Otherwise Opp wins
			return _winnerEffect("Opp");
		}
		// Opp attack can not, no matter how quick, go through defense, and player not stunned
		if (playerType !== "STUNNED") return _winnerEffect("Player");
		// Player stunned, but opp can not go trough defense anyway.
		return _winnerEffect("None");
	}

	// Defense for opp
	if (oppType === "DEF" || oppType === "STUNNED") {
		// Player has ignore defense
		if (playerBonus.ignore) {
			if (playerBonus.ignore === "DEF") {
				// However, the ability is dodge by opp
				if (oppAgi > playerAgi * 2) return _winnerEffect("Opp");
				// Can not partial dodge an ignore defense ability. Player wins
				oppDef = 0.0;
				return _winnerEffect("Player");
			}
		}
		// Player attack pierces defense
		if (playerAtk > oppDef) {
			// However, true dodge by opp
			if (oppAgi > playerAgi * 2) return _winnerEffect("Opp");
			// However, parital dodge by opp
			if (oppAgi > playerAgi * 1.5) return _winnerEffect("OppAgi");
			// Otherwise player wins
			return _winnerEffect("Player");
		}
		// Player attack can not, no matter how quick, go through opp defense, and opp not stunned
		if (oppType !== "STUNNED") return _winnerEffect("Opp");
		// Opp stunned, and player still can not go through defense
		return _winnerEffect("None");
	}

	// Now that it's down to the rest, check agility.
	if (playerAgi > 2 * oppAgi) {
		if (playerAtk > oppDef) return _winnerEffect("Player");
		// Player dodged, but can not hit through defense
		return _winnerEffect("None");
	}
	if (playerAgi > 1.5 * oppAgi) {
		if (playerAtk > oppDef) return _winnerEffect("PlayerAgi");
		// Can not break defense, but still got hit.
		if (oppAtk > playerDef) return _winnerEffect("OppPartial");
		return _winnerEffect("None");
	}
	if (oppAgi > 2 * playerAgi) {
		if (oppAtk > playerDef) return _winnerEffect("Opp");
		return _winnerEffect("None");
	}
	if (oppAgi > 1.5 * playerAgi) {
		if (oppAtk > playerDef) return _winnerEffect("OppAgi");
		if (playerAtk > oppAtk) return _winnerEffect("PlayerPartial");
		return _winnerEffect("None");
	}

	// no agility over a factor of 1.5, check for attack and defense difference
	if (playerAtk > oppDef && oppAtk > playerDef) return _winnerEffect("Both");
	if (playerAtk <= oppDef && oppAtk <= playerDef) return _winnerEffect("None");
	if (playerAtk > oppDef && oppAtk <= playerDef) return _winnerEffect("Player");
	if (playerAtk <= oppDef && oppAtk > playerDef) return _winnerEffect("Opp");

	// only possible if equal atk/def. Unlikely
	return _winnerEffect("None");
}

function ProcessSkill(state, skillId) {
	if (state.SBState.endResult) {
		return state.merge({
			dialSysText: "You can't do that! The fight has ended."
		})
	}

	let playerSkill = state.SkillData[skillId];

	// Do not have enough energy.
	if (playerSkill.energy > state.SBState.playerEnergy) {
		return state.merge({
			dialSysText: "You do not have enough energy for that!"
		});
	}

	let oppSkill = state.SkillData[CombatLogic(state.SBState, state.SkillData, skillId)];

	let playerSkillType = playerSkill.type;
	let playerSkillBonus = playerSkill.bonus;
	let oppSkillType = oppSkill.type;
	let oppSkillBonus = oppSkill.bonus;

	if (state.SBState.playerStatus.includes("Stunned")) {
		playerSkill = state.SkillData[SkillNames.STUNNED];
		playerSkillType = "STUNNED";
		playerSkillBonus = { atk: 0.0, def: 0.8, agi: 0.0, int: 0.0 };
	}

	if (state.SBState.oppStatus.includes("Stunned")) {
		oppSkill = state.SkillData[SkillNames.STUNNED];
		oppSkillType = "STUNNED";
		oppSkillBonus = { atk: 0.0, def: 0.8, agi: 0.0, int: 0.0 };
	}

	let winnerRes = CalcWinner(
		state.SBState,
		playerSkill,
		playerSkillBonus,
		playerSkillType,
		oppSkill,
		oppSkillBonus,
		oppSkillType
	);

	console.log(winnerRes);
	console.log("Player Status:", state.SBState.playerStatus);
	console.log("Opp Status:", state.SBState.oppStatus);

	// Register results
	// NOTE FOR ESCAPE. IT IS POSSIBLE TO ESCAPE, BUT STILL BE BELOW 0 HP. THAT CASE WILL RESULT IN A LOSS
	let endStatus = undefined;

	let playerHp = state.SBState.playerHp + Math.round(winnerRes.player.hp);
	let playerEnergy = state.SBState.playerEnergy + Math.round(winnerRes.player.energy) + 10 - playerSkill.energy;
	let playerSetUndying = false;
	let oppHp = state.SBState.oppHp + Math.round(winnerRes.opp.hp);
	let oppEnergy = state.SBState.oppEnergy + Math.round(winnerRes.opp.energy) + 10 - oppSkill.energy;
	let oppSetUndying = false;
	// Update status
	let playerStatus = [...state.SBState.playerStatus];
	let oppStatus = [...state.SBState.oppStatus];
	// Doesn't matter who won, remove focused and stunned state.
	playerStatus = playerStatus.filter(status => status !== "Stunned" && status !== "Focused");
	oppStatus = oppStatus.filter(status => status !== "Stunned" && status !== "Focused");

	// Apply stats!
	if (winnerRes.faster === "Player") {
		for (let i in winnerRes.player.removeStatus) {
			playerStatus = playerStatus.filter(status => status !== winnerRes.player.removeStatus[i]);
		}
		for (let i in winnerRes.player.status) {
			playerStatus.push(winnerRes.player.status[i]);
		}
		for (let i in winnerRes.opp.status) {
			oppStatus.push(winnerRes.opp.status[i]);
		}
		for (let i in winnerRes.opp.removeStatus) {
			oppStatus = oppStatus.filter(status => status !== winnerRes.opp.removeStatus[i]);
		}
	} else if (winnerRes.faster === "Opp") {
		for (let i in winnerRes.player.status) {
			playerStatus.push(winnerRes.player.status[i]);
		}
		for (let i in winnerRes.player.removeStatus) {
			playerStatus = playerStatus.filter(status => status !== winnerRes.player.removeStatus[i]);
		}
		for (let i in winnerRes.opp.removeStatus) {
			oppStatus = oppStatus.filter(status => status !== winnerRes.opp.removeStatus[i]);
		}
		for (let i in winnerRes.opp.status) {
			oppStatus.push(winnerRes.opp.status[i]);
		}
	} else {
		console.log("Invalid winner");
	}

	// Apply bleeding
	if (playerStatus.includes("Bleeding")) {
		playerHp -= Math.round(state.SBState.oppAtk * 0.05);
	}
	if (oppStatus.includes("Bleeding")) {
		oppHp -= Math.round(state.SBState.playerAtk * 0.05);
	}

	// Undying passive
	if (
		playerHp <= 0 &&
		state.SBState.playerPassive.includes(SkillNames.PAS_UNDYING) &&
		!state.SBState.playerUsedUndying
	) {
		playerHp = Math.round(state.SBState.playerHp * 0.2);
		playerStatus = [];
		playerSetUndying = true;
	}
	if (oppHp <= 0 && state.SBState.oppPassive.includes(SkillNames.PAS_UNDYING) && !state.SBState.oppUsedUndying) {
		oppHp = Math.round(state.SBState.playerHp * 0.2);
		oppStatus = [];
		oppSetUndying = true;
	}

	// Check state of game
	if (playerHp <= 0 && oppHp <= 0) endStatus = "Tie";
	else if (playerHp <= 0) endStatus = "Win-opp";
	else if (oppHp <= 0) endStatus = "Win-player";

	// If still alive, can escape
	if (winnerRes.player.end === "Escape") {
		endStatus = "Escape-player";
	}
	if (winnerRes.opp.end === "Escape") {
		endStatus = "Escape-opp";
	}

	// Set text
	let sysText = winnerRes.player.sysText + " " + winnerRes.opp.sysText;

	if (Math.round(winnerRes.player.hp) > 0) {
		sysText += " You gain " + Math.round(winnerRes.player.hp) + " health.";
		if (winnerRes.player.energy > 0) {
			sysText = sysText.substr(0, sysText.length - 1);
			sysText += " and " + Math.round(winnerRes.player.energy) + " energy.";
		}
	}

	playerStatus = [...new Set(playerStatus)];
	oppStatus = [...new Set(oppStatus)];

	return state.merge({
		dialSysText: sysText,
		SBState: state.SBState.merge({
			turn: state.SBState.turn + 1,
			playerHp: playerHp,
			playerEnergy: playerEnergy,
			playerStatus: playerStatus,
			playerUsedUndying: playerSetUndying && state.SBState.playerUsedUndying,
			oppHp: oppHp,
			oppEnergy: oppEnergy,
			oppStatus: oppStatus,
			oppUsedUndying: oppSetUndying && state.SBState.oppUsedUndying,
			endResult: endStatus
		})
	});
}

export default ProcessSkill;
