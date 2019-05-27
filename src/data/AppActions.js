/**
 * AppActions.js by zhongz132@gmail.com
 *
 * Dispatcher values for each action.
 */

import { ScreenActionTypes, GameActionTypes } from "./AppActionTypes.js";
import AppDispatcher from "./AppDispatcher.js";

const ScreenActions = {
	switchScreen(text) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.SWITCH_SCREEN,
			text
		});
	},

	changeName(text) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.CHANGE_NAME,
			text
		});
	},

	changeGameId(gameId) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.CHANGE_GAMEID,
			gameId
		});
	}
};

const GameActions = {
	switchLocation(locId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.SWITCH_LOCATION,
			locId
		});
	},

	dialLocAbout(locId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.DIAL_LOC_ABOUT,
			locId
		});
	},

	dialCharAbout(charId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.DIAL_CHAR_ABOUT,
			charId
		});
	},

	dialCharTalk(dialCharText) {
		AppDispatcher.dispatch({
			type: GameActionTypes.DIAL_CHAR_TALK,
			dialCharText
		});
	},

	dialSkillInfo(skillId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.DIAL_SKILL_INFO,
			skillId
		})
	},

	switchPlayerView(playerView) {
		AppDispatcher.dispatch({
			type: GameActionTypes.SWITCH_PLAYER_VIEW,
			playerView
		});
	},

	train(stat, multiplier, time) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_TRAIN,
			stat,
			multiplier,
			time
		});
	},

	learnSkill(skillId, time) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_LEARN,
			skillId,
			time
		});
	},

	startQuest(charId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_START_QUEST,
			charId
		});
	},

	infoQuest(charId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_INFO_QUEST,
			charId
		});
	},

	completeQuest(charId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_COMPLETE_QUEST,
			charId
		});
	},

	startSB(sbType) {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_SB,
			sbType
		});
	},

	endSB() {
		AppDispatcher.dispatch({
			type: GameActionTypes.CHAR_INTERACT_END_SB
		});
	},

	processSBMove(skillId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.SB_PROCESS_MOVE,
			skillId
		});
	}
};

export { ScreenActions, GameActions };
