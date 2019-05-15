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
			screen: "Home",
			gameId: 0,
		};
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