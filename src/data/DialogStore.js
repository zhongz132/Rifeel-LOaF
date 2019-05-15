import {ReduceStore} from 'flux/utils';
import {DialogActionTypes} from './AppActionTypes';
import AppDispatcher from './AppDispatcher.js';

class DialogStore extends ReduceStore {
	constructor() {
		super(AppDispatcher)
	}

	
}