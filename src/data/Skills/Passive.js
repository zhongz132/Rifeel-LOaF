/**
 * Passive.js by zhongz132@gmail.com
 *
 * Declaration of passive skill element in the game
 */

import Immutable from "immutable";

const Passive = Immutable.Record({
	name: "",
	about: "",
	type: "",
	level: 0,
	bonus: {}
});

export default Passive;