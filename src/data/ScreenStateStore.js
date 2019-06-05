/**
 * ScreenStateStore.js by zhongz132@gmail.com
 * 
 * Store for the screen state.
 */

import {ReduceStore} from 'flux/utils';
import {ScreenActionTypes} from './AppActionTypes';
import AppDispatcher from './AppDispatcher.js';

class ScreenStateStore extends ReduceStore {
	constructor() {
		super(AppDispatcher)
	}

	getInitialState() {
		return {
			name: "Alice",
			userId: "",
			screen: "Home",
			gameVersion: "Rifeel-LOaF-0.01",
			gameId: 0
		};
		// Should not be here in head
	}

	reduce(state, action) {
		switch(action.type) {
			case ScreenActionTypes.SWITCH_SCREEN:
				return {...state, screen: action.text};
			case ScreenActionTypes.CHANGE_NAME:
				return {...state, name: action.text}
			case ScreenActionTypes.CHANGE_GAMEID:
				return {...state, gameId: action.gameId}
			default:
				return state;
		}
	}
}

export default new ScreenStateStore();