/**
 * AppContainer.js by zhongz132@gmail.com
 * 
 * Container for the whole application.
 */

import {Container} from 'flux/utils';
import App from './../views/App.js';
import {ScreenActions, GameActions} from './../data/AppActions.js';
import ScreenStateStore from './../data/ScreenStateStore.js';
import GameStore from './../data/GameStore.js';

function getStores() {
	return [
		ScreenStateStore,
		GameStore,
	];
}

function getState() {
	return {
		screenState: ScreenStateStore.getState(),
		gameState: GameStore.getState(),

		onSwitchScreen: ScreenActions.switchScreen,
		onChangeName: ScreenActions.changeName,
		onChangeGameId: ScreenActions.ChangeGameId,

		onSwitchLocation: GameActions.switchLocation,
		onDialLocAbout: GameActions.dialLocAbout,
		onDialCharAbout: GameActions.dialCharAbout,
		onDialCharTalk: GameActions.dialCharTalk,
		onDialSkillInfo: GameActions.dialSkillInfo,
		onSwitchPlayerView: GameActions.switchPlayerView,
		onTrain: GameActions.train,
		onLearnSkill: GameActions.learnSkill,
		onStartQuest: GameActions.startQuest,
		onInfoQuest: GameActions.infoQuest,
		onCompleteQuest: GameActions.completeQuest,
		onStartSB: GameActions.startSB,
		onEndSB: GameActions.endSB,
		onProcessSBMove: GameActions.processSBMove
	}
}

export default Container.createFunctional(App, getStores, getState)