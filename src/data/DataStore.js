/**
 * DataStateStore.js by zhongz132@gmail.com
 *
 * Store for the all data.
 * Unless editing, this should never be changed.
 */

import { ReduceStore } from "flux/utils";
import AppDispatcher from "./AppDispatcher.js";
import Immutable from "immutable";
import ScreenNames from "./Common-Rifeel/ScreenNames.js";
import PlayerViewNames from "./Common-Rifeel/PlayerViewNames.js";

class DataStore extends ReduceStore {
	constructor() {
		super(AppDispatcher);
	}

	getInitialState() {
		let newData = Immutable.Record({
			ScreenNames: ScreenNames,
			PlayerViewNames: PlayerViewNames
		})
		return newData();
	}

	reduce(state, action) {
		return state;
	}
}

export default new DataStore();
