/**
 * SkillSpe.js by zhongz132@gmail.com
 *
 * All agility skills information for the game
 */

import Skill from "./Skill.js";
import SkillNames from "./SkillNames.js";

let SkillSpe = {};

SkillSpe[SkillNames.SPE_ESCAPE] = new Skill({
	name: "Escape",
	type: "SPE",
	about: "Try to run away from battle.",
	bonus: { atk: 0.8, def: 0.8, agi: 0.8, int: 0.8 },

	onFail: { text: "You fail to escape." },
	onSuccess: { text: "You manage to run away.", end: "Escape" }
});

SkillSpe[SkillNames.SPE_WAIT] = new Skill({
	name: "Wait",
	type: "SPE",
	about: "Do nothing.",
	bonus: { atk: 0.0, def: 0.9, agi: 1.0, int: 0.8 },

	onFail: { text: "Well..." },
	onSuccess: { text: "Nothing interesting happens.", energy: 10 }
});

SkillSpe[SkillNames.SPE_CHARGEUP] = new Skill({
	name: "Charge Up",
	type: "SPE",
	about: "Prepare your energy.",
	bonus: { atk: 0.0, def: 0.8, agi: 0.3, int: 1.0 },

	onFail: { text: "Your opponent distracts you.", energy: 10 },
	onSuccess: { text: "You charge up succesfully.", energy: 25 }
});

SkillSpe[SkillNames.SPE_EXAMINE] = new Skill({
	name: "Examine",
	type: "SPE",
	about: "Examine your opponent's weak points",
	bonus: { atk: 0.0, def: 1.1, agi: 1.2, int: 1.2 },

	onFail: { text: "Your examine fails." },
	onSuccess: { text: "You find your opponent's weakness.", selfstatus: ["Focused"] }
});

SkillSpe[SkillNames.SPE_BERSERK] = new Skill({
	name: "Berserk",
	type: "SPE",
	about: "Abandons your defense to deliver a devastating blow next turn.",
	bonus: { atk: 0.0, def: 0.0, agi: 0.0, int: 0.0 },

	onFail: { text: "You are berserk.", energy: 10, selfstatus: ["Berserk"] },
	onSuccess: { text: "You are berserk.", energy: 10, selfstatus: ["Berserk"] }
});

SkillSpe[SkillNames.SPE_BANDAGE] = new Skill({
	name: "Bandage wounds",
	type: "SPE",
	about: "Bandage your wounds and slightly restores HP.",
	bonus: { atk: 0.0, def: 0.8, agi: 0.0, int: 1.2 },

	onFail: { text: "Your fail to heal yourself.", remove: ["Bleeding"] },
	onSuccess: { text: "You banadage yourself succesfully.", heal: 0.1, remove: ["Bleeding"] }
});

SkillSpe[SkillNames.SPE_HEAL] = new Skill({
	name: "Heal",
	type: "SPE",
	about: "Heals statuses and restores HP.",
	energy: 20,
	bonus: { atk: 0.0, def: 0.9, agi: 0.2, int: 1.4 },

	onFail: { text: "Your opponent takes advantage.", heal: 0.05, remove: ["Bleeding"] },
	onSuccess: { text: "You heal yourself succesfully.", heal: 0.15, remove: ["Bleeding", "Poisoned"] }
});

export default SkillSpe;
