import {Container} from 'flux/utils';
import App from './../views/App.js';
import {ScreenActions} from './../data/AppActions.js';
import ScreenStateStore from './../data/ScreenStateStore.js';

function getStores() {
	return [
		ScreenStateStore,
	];
}

function getState() {
	return {
		screenState: ScreenStateStore.getState(),

		onSwitchScreen: ScreenActions.switchScreen,
		onChangeName: ScreenActions.changeName,
		onChangeGameId: ScreenActions.onChangeGameId,
	}
}

export default Container.createFunctional(App, getStores, getState)