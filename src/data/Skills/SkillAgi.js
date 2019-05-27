/**
 * SkillAgi.js by zhongz132@gmail.com
 *
 * All agility skills information for the game
 */

import Skill from "./Skill.js";
import SkillNames from "./SkillNames.js";

var SkillAgi = {};

SkillAgi[SkillNames.AGI_BASIC] = new Skill({
	name: "Sneak",
	type: "AGI",
	about: "Slide and sneak attack.",
	bonus: { atk: 0.9, def: 0.8, agi: 1.4, int: 0.3 },

	onFail: { text: "Your sneak attack fails." },
	onSuccess: { text: "Your sneak attack succeeds.", dmg: 0.25 }
});

SkillAgi[SkillNames.AGI_BACKSTAB] = new Skill({
	name: "Backstab",
	type: "AGI",
	about: "Go behind the opponent and stab quickly.",
	energy: 20,
	bonus: { atk: 1.5, def: 0.8, agi: 2.5, int: 0.8 },

	onFail: { text: "Your backstab fails to pierce your opponent's defense." },
	onSuccess: { text: "Your backstab succeeds.", dmg: 0.4, status: ["Bleeding"] }
});

SkillAgi[SkillNames.AGI_QUICKSTRIKE] = new Skill({
	name: "Quick strike",
	type: "AGI",
	about: "Strikes extremely quickly in a vital spot.",
	energy: 30,
	bonus: { atk: 1.2, def: 0.7, agi: 6.0, int: 0.8 },

	onFail: { text: "Your quickstrike failed.", selfstatus: ["Stunned"] },
	onSuccess: { text: "Your aim is true.", dmg: 0.4, status: ["Bleeding"] }
});

SkillAgi[SkillNames.AGI_EVISCERATE] = new Skill({
	name: "Eviserate",
	type: "AGI",
	about: "Go behind an enemy and perform a sure, targeted strike.",
	energy: 40,
	bonus: { ignore: "DEF", atk: 0.4, def: 0.8, agi: 1.2, int: 1.2 },

	onFail: { text: "Your dagger misses." },
	onSuccess: { text: "Your dagger pierces skin.", dmg: 0.5, status: ["Bleeding"] }
});

SkillAgi[SkillNames.AGI_ASSASSINATE] = new Skill({
	name: "Assassinate",
	type: "AGI",
	about: "Assasinate your target.",
	energy: 80,
	bonus: { atk: 2.0, def: 0.5, agi: 6.0, int: 1.6 },

	onFail: { text: "Your assassination failed.", selfstatus: ["Stunned"] },
	onSuccess: {
		text: "You critically strike your target.",
		dmg: 0.6,
		energy: 10,
		selfstatus: ["Focused"],
		status: ["Stunned", "Bleeding"]
	}
});

export default SkillAgi;
