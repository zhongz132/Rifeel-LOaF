/**
 * AppStateStore.js by zhongz132@gmail.com
 *
 * Store for the screen state and app data.
 */

import { ReduceStore } from "flux/utils";
import { AppActionTypes } from "./AppActionTypes";
import AppDispatcher from "./AppDispatcher.js";
import Immutable from "immutable";

class AppStateStore extends ReduceStore {
	constructor() {
		super(AppDispatcher);
	}

	getInitialState() {
		let baseScreen = Immutable.Record({
			screen: "Home",
			curGameId: "0"
		});
		return new baseScreen();
		// Should not be here in head
	}

	reduce(state, action) {
		switch (action.type) {
			case AppActionTypes.SWITCH_SCREEN:
				return state.set("screen", action.nextScreen);
			case AppActionTypes.CHANGE_GAMEID:
				return state.set("curGameId", action.gameId);
			case AppActionTypes.SAVE_GAME:
				return state;
			default:
				return state;
		}
	}
}

export default new AppStateStore();
