/**
 * SkillDef.js by zhongz132@gmail.com
 *
 * All defense skills information for the game
 */

import Skill from "./Skill.js";
import SkillNames from "./SkillNames.js";

var SkillDef = {};

SkillDef[SkillNames.DEF_BASIC] = new Skill({
	name: "Defend",
	type: "DEF",
	about: "Basic defense with a weapon or shield.",
	bonus: { atk: 0.0, def: 1.2, agi: 0.2, int: 0.2 },

	onFail: { text: "Your defense fails." },
	onSuccess: { text: "You defend successfully.", energy: 5 }
});

SkillDef[SkillNames.DEF_PARRY] = new Skill({
	name: "Parry",
	type: "DEF",
	about: "Deflect an attack.",
	energy: 20,
	bonus: { atk: 0.8, def: 1.4, agi: 0.8, int: 0.8 },

	onFail: { text: "You parry fails." },
	onSuccess: { text: "You parry successfully.", steal: 10 }
});

SkillDef[SkillNames.DEF_BLOCK] = new Skill({
	name: "Block",
	type: "DEF",
	about: "Prepare for a strong attack.",
	energy: 35,
	bonus: { atk: 0.0, def: 4.0, agi: 0.2, int: 0.5 },

	onFail: { text: "Your block fails." },
	onSuccess: { text: "You block successfully.", steal: 5, selfstatus: ["Focused"] }
});

SkillDef[SkillNames.DEF_DODGE] = new Skill({
	name: "Dodge",
	type: "DEF",
	about: "Dodges a perceived attack.",
	energy: 35,
	bonus: { atk: 0.0, def: 0.5, agi: 4.0, int: 0.5 },

	onFail: { text: "You dodge fails." },
	onSuccess: { text: "You dodge the attack.", steal: 5, selfstatus: ["Focused"] }
});

SkillDef[SkillNames.DEF_COUNTER] = new Skill({
	name: "Counter",
	type: "DEF",
	about: "Blocks or dodges an attack in advance, then deliver a sure strike back.",
	energy: 60,
	bonus: { atk: 1.5, def: 3.2, agi: 3.2, int: 1.3 },

	onFail: { text: "Your counter fails." },
	onSuccess: { text: "Your counter skillfully.", dmg: 0.4, selfstatus: ["Focused"], status: ["Bleeding"] }
});

SkillDef[SkillNames.STUNNED] = new Skill({
	name: "STUNNED",
	type: "DEF",
	about: "STUN STATUS",
	energy: 0,
	bonus: { atk: 0.0, def: 0.8, agi: 0.0, int: 0.0 },

	onFail: { text: "You are stunned!" },
	onSuccess: { text: "You are stunned!" }
});

export default SkillDef;
