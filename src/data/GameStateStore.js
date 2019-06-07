/**
 * PlayerStateStore.js by zhongz132@gmail.com
 *
 * Store for the information for the game state.
 */

import { ReduceStore } from "flux/utils";
import { GameActionTypes } from "./AppActionTypes";
import AppDispatcher from "./AppDispatcher.js";
import Immutable from "immutable";
import NewGame from "./Common-Rifeel/GameBase.js";
import GenGameId from "./Common-Rifeel/GenGameId.js";

class GameStateStore extends ReduceStore {
	constructor() {
		super(AppDispatcher);
	}

	getInitialState() {
		return new NewGame();
	}

	reduce(state, action) {
		switch(action.type) {
			case GameActionTypes.NEW_GAME:
				let newId = GenGameId();
				let newGame = new NewGame();
				newGame = newGame.set("gameId", newId);
				console.log(newId);
				return newGame;
			case GameActionTypes.SAVE_GAME:
				localStorage.setItem("Rifeel-Game-" + state.gameId, JSON.stringify(state));
				return state;
			case GameActionTypes.LOAD_GAME:
				let loadGame = JSON.parse(localStorage.getItem(action.gameId));
				let immutableLoadGame = Immutable.Record(loadGame);
				return new immutableLoadGame();
			default:
				return state;
		}
	}
}

export default new GameStateStore();
