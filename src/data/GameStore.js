/**
 * GameStore.js by zhongz132@gmail.com
 *
 * Stores the dialog information in the game screen.
 */

//import Immutable from "immutable";
import { ReduceStore } from "flux/utils";
import { GameActionTypes } from "./AppActionTypes";
//import LocId from "./Locations/LocIdGen.js";
import Game from "./Utils/Game.js";
import AppDispatcher from "./AppDispatcher.js";
//import LocationData from "./Locations/LocationData.js";
//import CharacterData from "./Characters/CharacterData.js";
//import test from "./test.js"
import { UpdateChar, UpdateLoc } from "./Utils/UpdateReqs.js";
import ProcessRewards from "./Utils/ProcessRewards.js";
import ProcessTake from "./Utils/ProcessTake.js";
import StartSpar from "./Utils/StartSpar.js";
import GetSkillInfo from "./Utils/GetSkillInfo.js";
import ProcessSkill from "./Utils/ProcessSkill.js";
import ProcessSBEnd from "./Utils/ProcessSBEnd.js";
import GameTest from "./Game/Game.js";

class GameStore extends ReduceStore {
	constructor() {
		super(AppDispatcher);
	}

	getInitialState() {
		return UpdateLoc(new Game(), "World_Lian");
	}

	reduce(state, action) {
		switch (action.type) {
			case GameActionTypes.SWITCH_LOCATION:
				state = UpdateLoc(state, action.locId);
				if (action.locId === "Back") {
					return state.merge({
						//locData: updateReqs(state.locData[state.curLoc], state),
						curLoc: state.prevLoc,
						curChar: "",
						dialLocId: "",
						dialCharId: "",
						dialSysText: "",
						dialCharText: ""
					});
				} else {
					return state.merge({
						//locData: updateReqs(state.locData[action.locId], state),
						prevLoc: state.curLoc,
						curLoc: action.locId,
						curChar: "",
						dialLocId: "",
						dialCharId: "",
						dialSysText: "",
						dialCharText: "",
						time: state.time + state.LocData[action.locId].time
					});
				}

			case GameActionTypes.DIAL_LOC_ABOUT:
				return state.merge({
					dialLocId: action.locId,
					dialCharId: "",
					dialSysText: state.LocData[action.locId].about,
					dialCharText: ""
				});

			case GameActionTypes.DIAL_CHAR_ABOUT:
				state = UpdateChar(state, action.charId);
				return state.merge({
					curChar: action.charId,
					dialSysText: state.CharData[action.charId].about,
					dialCharText: "",
					dialCharId: action.charId
				});

			case GameActionTypes.DIAL_CHAR_TALK:
				return state.merge({
					dialSysText: "",
					dialCharText: action.dialCharText
				});

			case GameActionTypes.DIAL_SKILL_INFO:
				return state.merge({
					dialSysText: GetSkillInfo(state.SkillData[action.skillId]),
					dialCharText: ""
				});

			case GameActionTypes.SWITCH_PLAYER_VIEW:
				return state.merge({
					playerView: action.playerView
				});

			case GameActionTypes.CHAR_INTERACT_TRAIN:
				let difference = state.CharData[state.dialCharId][action.stat] - state.player[action.stat];
				difference = Math.max(difference, 1);
				difference = Math.log(difference * action.multiplier);
				difference = Math.round(difference);
				let toAdd = difference | 0;
				state = state.merge({
					player: state.player.set(action.stat, state.player[action.stat] + toAdd),
					dialCharText: "",
					dialSysText: "You gained " + toAdd + " points in " + action.stat.toUpperCase(),
					time: state.time + state.CharData[state.curChar].interact.train.time
				});
				return UpdateChar(state, state.dialCharId);

			case GameActionTypes.CHAR_INTERACT_LEARN:
				let newSkill = [...state.player.skill];
				newSkill.push(action.skillId);
				state = state.merge({
					player: state.player.set("skill", newSkill),
					dialCharText: "",
					dialSysText: "Congrats! You have learned " + action.skillId,
					time: state.time + action.time
				});
				return UpdateChar(state, state.dialCharId);

			case GameActionTypes.CHAR_INTERACT_START_QUEST:
				return state.merge({
					activeQuest: [...state.activeQuest, action.charId],
					dialCharText: state.CharData[state.dialCharId].interact.quest.about,
					dialSysText: "You have started a quest for " + state.CharData[state.dialCharId].name
				});

			case GameActionTypes.CHAR_INTERACT_INFO_QUEST:
				return state.merge({
					dialCharText: state.CharData[state.dialCharId].interact.quest.about,
					dialSysText: ""
				});

			case GameActionTypes.CHAR_INTERACT_COMPLETE_QUEST:
				let reward = state.CharData[action.charId].interact.quest.reward;
				state = ProcessRewards(state, reward);
				if (state.CharData[action.charId].interact.quest.take) {
					state = ProcessTake(state, state.CharData[action.charId].interact.quest.take);
				}
				return state.merge({
					completeQuest: [...state.completeQuest, action.charId],
					activeQuest: state.activeQuest.filter(quest => quest !== action.charId),
					dialCharText: state.CharData[state.dialCharId].interact.quest.doneText,
					dialSysText: "You have completed the quest for " + state.CharData[state.dialCharId].name
				});

			case GameActionTypes.CHAR_INTERACT_SB:
				if (action.sbType === "Spar") {
					return state.merge({
						time: state.time + state.CharData[state.curChar].interact.spar.time,
						prevLoc: state.curLoc,
						curLoc: "Spar",
						playerView: "overview",
						SBState: StartSpar(state)
					});
				}
				return state;

			case GameActionTypes.CHAR_INTERACT_END_SB:
				state = ProcessSBEnd(state);
				console.log(state.curLoc);
				state = UpdateChar(state, state.curChar);
				return UpdateLoc(state, state.curLoc);

			case GameActionTypes.SB_PROCESS_MOVE:
				return ProcessSkill(state, action.skillId);

			default:
				return state;
		}
	}
}

export default new GameStore();
