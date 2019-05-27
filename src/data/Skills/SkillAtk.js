/**
 * SkillData.js by zhongz132@gmail.com
 *
 * All attack skills information for the game
 */

import Skill from "./Skill.js"
import SkillNames from "./SkillNames.js";

var SkillAtk = {};

SkillAtk[SkillNames.ATK_BASIC] = new Skill({
	name: "Attack",
	type: "ATK",
	about: "Strike with your main hand weapon.",
	bonus: { atk: 1.5, def: 0.8, agi: 0.75, int: 0.2 },

	onFail: { text: "Your attack fails." },
	onSuccess: { text: "You attack succeeds.", dmg: 0.2 }
});

SkillAtk[SkillNames.ATK_DSTAB] = new Skill({
	name: "Double Stab",
	type: "ATK",
	about: "Stabs twice quickly.",
	energy: 20,
	bonus: { atk: 1.6, def: 0.8, agi: 1.1, int: 0.6 },

	onFail: { text: "Your stab fails." },
	onSuccess: { text: "You stab your opponent twice and gain 5 energy.", dmg: 0.5, energy: 5, status: ["Bleeding"] }
});

SkillAtk[SkillNames.ATK_SMASH] = new Skill({
	name: "Smash",
	type: "ATK",
	about: "Smashes your opponent with your weapon.",
	energy: 30,
	bonus: { atk: 6.0, def: 0.5, agi: 0.4, int: 0.4 },

	onFail: { text: "Your smash fails." },
	onSuccess: { text: "You smash and stun your opponenet.", dmg: 0.2, energy: 5, status: ["Stunned"] }
});

SkillAtk[SkillNames.ATK_CHARGE] = new Skill({
	name: "Charge",
	type: "ATK",
	about: "Charges your opponent.",
	energy: 55,
	bonus: { atk: 3.0, def: 0.9, agi: 2.4, int: 0.5 },

	onFail: { text: "Your charge fails." },
	onSuccess: { text: "Your charge succeeds.", dmg: 0.3, energy: 10, status: ["Stunned"] }
});

SkillAtk[SkillNames.ATK_FINALBREATH] = new Skill({
	name: "Final Breath",
	type: "ATK",
	about: "Strike your opponent with all you have.",
	energy: 100,
	bonus: { atk: 6.0, def: 0.3, agi: 2.0, int: 0.6 },

	onFail: { text: "Your strike fails.", selfstatus: ["Stunned"], status: ["Focused"] },
	onSuccess: {
		text: "Your strike destroy your target and instills fear.",
		dmg: 0.4,
		energy: 20,
		selfstatus: ["Berserk"],
		status: ["Stunned", "Bleeding"]
	}
});

export default SkillAtk;
