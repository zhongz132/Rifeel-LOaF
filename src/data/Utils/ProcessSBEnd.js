/**
 * ProcessSBEnd.js by zhongz132@gmail.com
 *
 * Processes the results from a spar or battle
 */

import ProcessRewards from "./ProcessRewards.js";

function ProcessSBEnd(state) {
	let type = state.SBState.type;
	let endResult = state.SBState.endResult;
	if (type === "Spar") {
		switch (endResult) {
			case "Win-player":
				if (state.doneSpar.includes(state.curChar)) {
					return state.merge({
						curLoc: state.prevLoc,
						dialSysText: "You have defeated " + state.CharData[state.curChar].name + "."
					});
				} else {
					state = ProcessRewards(state, state.CharData[state.curChar].interact.spar.reward);
					return state.merge({
						curLoc: state.prevLoc,
						dialSysText: "You have won!",
						doneSpar: [...state.doneSpar, state.curChar]
					});
				}
			case "Win-opp":
				return state.merge({ curLoc: state.prevLoc, dialSysText: "You have lost the spar." });
			case "Tie":
				return state.merge({ curLoc: state.prevLoc, dialSysText: "There is no winner." });
			case "Escape-player":
				return state.merge({ curLoc: state.prevLoc, dialSysText: "Coward...." });
			case "Escape-opp":
				state = ProcessRewards(state, state.CharData[state.curChar].interact.spar.reward);
				return state.merge({
					curLoc: state.prevLoc,
					dialSysText: "Your opponent ran away! You won.",
					doneSpar: [...state.doneSpar, state.curChar]
				});
			default:
				console.log("ERROR: Invalid end result in spar:", endResult);
				return state.merge({ curLoc: state.prevLoc });
		}
	}
	return state;
}

export default ProcessSBEnd;
