var test = function() {
	function newFunc() {
		this._state = "Hi";
	}

	newFunc.prototype.isEqual = function isEqual(one, two) {
		return one === two;
	};

	newFunc.prototype.areStatesEqual = function areStatesEqual(newState) {
		// Something
		if (!this.isEqual(newState, this._state)) {
		// WHY DON'T YOU JUST DO:
		// if (newState !== this._state) {
			this._state = newState;
		} else {
			// Something
		}
	};
};

export default test;
