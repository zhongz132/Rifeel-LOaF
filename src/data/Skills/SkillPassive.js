/**
 * SkillAgi.js by zhongz132@gmail.com
 *
 * All passive skills information for the game
 */

import Passive from "./Passive.js";
import SkillNames from "./SkillNames.js";

var SkillPassive = {};

SkillPassive[SkillNames.PAS_FATED] = new Passive({
	name: "Fated",
	about: "You have been declared a fated one.",
	type: "SPE"
});

SkillPassive[SkillNames.PAS_UNDYING] = new Passive({
	name: "Undying",
	about: "You are undying.",
	type: "SPE"
});

SkillPassive[SkillNames.PAS_WOLF] = new Passive({
	name: "Wolf",
	about: "Bark? Awoooo!",
	type: "CST",
	level: 0,
	bonus: { cst: 0.05, energy: 5 }
});

SkillPassive[SkillNames.PAS_BEAR] = new Passive({
	name: "Bear",
	about: "Bearlike.",
	type: "CST",
	level: 1,
	bonus: { cst: 0.1, def: 0.05, energy: 5 }
});

SkillPassive[SkillNames.PAS_DRAGON] = new Passive({
	name: "Dragon",
	about: "Dragon's blood flows through your veins.",
	type: "CST",
	level: 2,
	bonus: { cst: 0.2, def: 0.1, atk: 0.05, energy: 10 }
});

SkillPassive[SkillNames.PAS_SPEARMAN] = new Passive({
	name: "Spearman",
	about: "A starting spearman.",
	type: "ATK",
	level: 0,
	bonus: { atk: 0.05, energy: 5 }
});

SkillPassive[SkillNames.PAS_WARRIOR] = new Passive({
	name: "Warrior",
	about: "A great warrior.",
	type: "ATK",
	level: 1,
	bonus: { atk: 0.1, agi: 0.05, energy: 5 }
});

SkillPassive[SkillNames.PAS_BERSERKER] = new Passive({
	name: "Berserker",
	about: "RRAAAGGGHHHH",
	type: "ATK",
	level: 2,
	bonus: { atk: 0.2, agi: 0.1, def: 0.05, energy: 10 }
});

SkillPassive[SkillNames.PAS_INFANTRY] = new Passive({
	name: "Infantry",
	about: "Attention!",
	type: "DEF",
	level: 0,
	bonus: { def: 0.05, cst: 0.025 }
});

SkillPassive[SkillNames.PAS_SOLDIER] = new Passive({
	name: "Soldier",
	about: "A loyal, unwavering soldier.",
	type: "DEF",
	level: 1,
	bonus: { def: 0.1, cst: 0.05, atk: 0.025 }
});

SkillPassive[SkillNames.PAS_KNIGHT] = new Passive({
	name: "Knight",
	about: "Oh, glorious knight.",
	type: "DEF",
	level: 2,
	bonus: { def: 0.2, cst: 0.1, atk: 0.1, agi: 0.05 }
});

SkillPassive[SkillNames.PAS_THIEF] = new Passive({
	name: "Thief",
	about: "A theif and nothing more.",
	type: "AGI",
	level: 0,
	bonus: { agi: 0.05, int: 0.025 }
});

SkillPassive[SkillNames.PAS_ROGUE] = new Passive({
	name: "Rogue",
	about: "Better, but still a rogue.",
	type: "AGI",
	level: 1,
	bonus: { agi: 0.1, int: 0.05, atk: 0.025 }
});

SkillPassive[SkillNames.PAS_ASSASSAIN] = new Passive({
	name: "Assassain",
	about: "Nobels tremble at your name.",
	type: "AGI",
	level: 2,
	bonus: { agi: 0.2, int: 0.1, atk: 0.1, energy: 5 }
});

SkillPassive[SkillNames.PAS_MESSENGER] = new Passive({
	name: "Messenger",
	about: "Quickly now.",
	type: "INT",
	level: 0,
	bonus: { int: 0.05, energy: 5 }
});

SkillPassive[SkillNames.PAS_ANALYST] = new Passive({
	name: "ANALYST",
	about: "I wonder...",
	type: "INT",
	level: 1,
	bonus: { int: 0.1, energy: 5 }
});

SkillPassive[SkillNames.PAS_TACTICIAN] = new Passive({
	name: "Tactician",
	about: "I know.",
	type: "INT",
	level: 2,
	bonus: { int: 0.2, energy: 5, status: "Focused"}
});

export default SkillPassive;
