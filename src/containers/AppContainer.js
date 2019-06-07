/**
 * AppContainer.js by zhongz132@gmail.com
 *
 * Container for the whole application.
 */

import { Container } from "flux/utils";
import App from "./../views/App.js";
import { AppActions, GameActions } from "./../data/AppActions.js";
import AppStateStore from "./../data/AppStateStore.js";
import GameStateStore from "./../data/GameStateStore.js";
import DataStore from "./../data/DataStore.js";

function getStores() {
	return [AppStateStore, GameStateStore, DataStore];
}

function getState() {
	return {
		screenState: AppStateStore.getState(),
		Data: DataStore.getState(),
		gameState: GameStateStore.getState(),

		onSwitchScreen: AppActions.switchScreen,
		onChangeGameId: AppActions.changeGameId,

		onNewGame: GameActions.newGame,
		onSaveGame: GameActions.saveGame,
		onLoadGame: GameActions.loadGame
	};
}

export default Container.createFunctional(App, getStores, getState);
