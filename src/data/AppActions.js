/**
 * AppActions.js by zhongz132@gmail.com
 *
 * Dispatcher values for each action.
 */

import { AppActionTypes, GameActionTypes } from "./AppActionTypes.js";
import AppDispatcher from "./AppDispatcher.js";

export const AppActions = {
	switchScreen(nextScreen) {
		AppDispatcher.dispatch({
			type: AppActionTypes.SWITCH_SCREEN,
			nextScreen
		});
	},

	changeGameId(gameId) {
		AppDispatcher.dispatch({
			type: AppActionTypes.CHANGE_GAMEID,
			gameId
		});
	}
};

export const GameActions = {
	newGame() {
		AppDispatcher.dispatch({
			type: GameActionTypes.NEW_GAME
		});
	},

	saveGame() {
		AppDispatcher.dispatch({
			type: GameActionTypes.SAVE_GAME
		});
	},

	loadGame(gameId) {
		AppDispatcher.dispatch({
			type: GameActionTypes.LOAD_GAME,
			gameId
		});
	}
};
