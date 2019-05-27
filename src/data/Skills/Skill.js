/**
 * Skill.js by zhongz132@gmail.com
 *
 * Declaration of active skill element in the game
 */

import Immutable from "immutable";

const Skill = Immutable.Record({
	name: "", // Name of the skill
	type: "", // Type: ATK, DEF, AGI, SPE (special)
	about: "",
	energy: 0, // Energy required to use
	bonus: {}, // Bonus stats/effects the attack has

	onFail: {},
	onSuccess: {},
});

export default Skill;