/**
 * UpdateReqs.js by zhongz132@gmail.com
 *
 * Checks if the requirements of an element(s) is/are met
 */

function __checkReq(state, req) {
	for (var key in req) {
		switch (key) {
			case "cst":
				if (state.player.cst < req[key]) return false;
				break;
			case "atk":
				if (state.player.atk < req[key]) return false;
				break;
			case "def":
				if (state.player.def < req[key]) return false;
				break;
			case "agi":
				if (state.player.agi < req[key]) return false;
				break;
			case "int":
				if (state.player.int < req[key]) return false;
				break;
			case "inf":
				if (state.player.inf < req[key]) return false;
				break;
			case "rep":
				if (state.player.rep < req[key]) return false;
				break;
			case "gold":
				if (state.gold < req[key]) return false;
				break;
			case "timeStart":
				if (state.time < req[key]) return false;
				break;
			case "timeEnd":
				if (state.time > req[key]) return false;
				break;
			case "loc":
				for (var loc in req[key]) {
					if (!state.validLoc.includes(req[key][loc])) return false;
				}
				break;
			case "char":
				for (var char in req[key]) {
					if (!state.doneChar.includes(req[key][char])) return false;
				}
				break;
			case "skill":
				for (var skill in req[key]) {
					if (!state.player.skill.includes(req[key][skill])) return false;
				}
				break;
			case "dead":
				for (var dead in req[key]) {
					if (!state.deadChar.includes(req[key][dead])) return false;
				}
				break;
			case "quest":
				for (var quest in req[key]) {
					if (!state.doneQuest.includes(req[key][quest])) return false;
				}
				break;
			case "item":
				for (var item in req[key]) {
					if (!state.player.inventory.includes(req[key][item])) return false;
				}
				break;
			case "spar":
				for (var spar in req[key]) {
					if (!state.doneSpar.includes(req[key][spar])) return false;
				}
				break;
			default:
				console.log("Error: Invalid requirement.");
				return false;
		}
	}

	return true;
}

function __checkReqs(state, reqs) {
	if (!reqs || reqs.length === 0) {
		return true;
	}
	for (var i in reqs) {
		// ONE of the reqs is true
		if (__checkReq(state, reqs[i])) {
			return true;
		}
	}

	return false;
}

export function UpdateChar(state, charId) {
	let interactions = state.CharData[charId].interact;
	for (var key in interactions) {
		if (interactions[key].validReq) {
			switch (key) {
				case "quest":
					if (!state.validQuest.includes(charId)) {
						if (__checkReqs(state, interactions[key].validReq)) {
							state = state.merge({
								validQuest: [...state.validQuest, charId]
							});
						}
					}
					break;
				case "teachSkill":
					if (!state.validSkill.includes(interactions[key].skillId)) {
						if (__checkReqs(state, interactions[key].validReq)) {
							state = state.merge({
								validSkill: [...state.validSkill, interactions[key].skillId]
							});
						}
					}
					break;
				default:
					console.log(
						"Error: tried to check valid requirements in an unrecognized state." + key
					);
			}
		}

		// Check if quests are done.
		if (interactions[key].doneReq) {
			// ONLY QUESTS SHOULD BE DONE. NOTHING ELSE.
			if (key === "quest") {
				if (!state.doneQuest.includes(charId) && state.validQuest.includes(charId)) {
					if (__checkReqs(state, interactions[key].doneReq)) {
						state = state.merge({
							doneQuest: [...state.doneQuest, charId]
						})
					}
				}
			} else {
				console.log("Error: tried to check character interaction done for type that is not quest in UpdateReqs/updateChar");
			}
		}

		// Check if character is done
		if (!state.doneChar.includes(charId)) {
			if (__checkReqs(state, state.CharData[charId].doneReq)) {
				state = state.merge({
					doneChar: [...state.doneChar, charId]
				})
			}
		}

	}

	return state;
}

export function UpdateLoc(state, location) {
	let locParent = state.LocData[location].parent;
	let locChildren = state.LocData[location].children;
	let locChars = state.LocData[location].characters;

	// Parent
	if (locParent === "") {
	} else if (locParent === null) {
		console.log("Error: parent is null in UpdateReqs/updateReqs.");
	} else {
		// parent is not valid!
		if (!state.validLoc.includes(locParent)) {
			let parentReqs = state.LocData[locParent].validReq;
			// It is valid. Add to validLoc
			if (__checkReqs(state, parentReqs)) {
				// add to state
				state = state.merge({
					validLoc: [...state.validLoc, locParent]
				});
			}
		}
	}

	// Children
	if (locChildren === null) {
		console.log("Error: children are null in UpdateReqs/updateReqs");
	} else if (locChildren.length === 0) {
		// This is oaky, do nothing
	} else {
		for (var child in locChildren) {
			if (!state.validLoc.includes(locChildren[child])) {
				let childReqs = state.LocData[locChildren[child]].validReq;
				if (__checkReqs(state, childReqs)) {
					state = state.merge({
						validLoc: [...state.validLoc, locChildren[child]]
					});
				}
			}
		}
	}

	// Characters
	if (locChars === null) {
		console.log("Error: characters are null in UpdateReqs/updateReq");
	} else if (locChars.length === 0) {
		// This is okay, do nothing
	} else {
		for (var char in locChars) {
			// valid
			if (!state.validChar.includes(locChars[char])) {
				let charReqs = state.CharData[locChars[char]].validReq;
				if (__checkReqs(state, charReqs)) {
					state = state.merge({
						validChar: [...state.validChar, locChars[char]]
					});
				}
			}

			// done
			if (!state.doneChar.includes(locChars[char])) {
				let charReqs = state.CharData[locChars[char]].doneReq;
				if (__checkReqs(state, charReqs)) {
					state = state.merge({
						doneChar: [...state.doneChar, locChars[char]]
					});
				}
			}

			UpdateChar(state, locChars[char]);
		}
	}

	return state;
}
