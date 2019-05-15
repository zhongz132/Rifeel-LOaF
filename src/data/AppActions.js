import {ScreenActionTypes, DialogActionTypes} from "./AppActionTypes.js";
import AppDispatcher from "./AppDispatcher.js";

const ScreenActions = {
	switchScreen(text) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.SWITCH_SCREEN,
			text,
		});
	},

	changeName(text) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.CHANGE_NAME,
			text,
		});
	},

	changeGameId(gameId) {
		AppDispatcher.dispatch({
			type: ScreenActionTypes.CHANGE_GAMEID,
			gameId,
		});
	}
};

const DialogActions = {
	loadAboutText(locId, charId) {
		AppDispatcher.dispatch({
			type: DialogActionTypes.LOAD_ABOUT_TEXT,
			locId,
			charId,
		});
	},

	loadTalkText(locId, charId) {
		AppDispatcher.dispatch({
			type: DialogActionTypes.LOAD_TALK_TEXT,
			locId,
			charId,
		});
	},

	loadIntText(locId, charId) {
		AppDispatcher.dispatch({
			type: DialogActionTypes.LOAD_INTERACT_TEXT,
			locId,
			charId,
		});
	}

}

export {ScreenActions, DialogActions};
