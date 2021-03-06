/**
 * CharLianData.js by zhongz132@gmail.com
 *
 * Stores the data for the characters in Lian
 */

//import Immutable from "immutable";
import Character from "./Character.js";
import SkillNames from "./../Skills/SkillNames.js";
import CombatLogicNames from "./../CombatLogic/CombatLogicNames.js";

var _town = "World_Lian_";
var _home = _town + "Home_";
var _dojo = _town + "Dojo_";
var _school = _town + "School_";
var _hall = _town + "Hall_";
var _shop = _town + "Shop_";
var _center = _town + "Center_";

const CharLianData = {};

// Home
CharLianData[_home + "Mom"] = new Character({
	name: "Mom",
	about: "Teaches at the local elementary school. Gives new meaning to the phrase 'Unconditional love'.",
	agi: 115,
	int: 450,
	inf: 250,
	talk: [
		{
			question: "Who are you?",
			answer: "Oh dear, it seems you've gone blind. You can't even recognize your own mother."
		},
		{
			question: "Do you need help?",
			answer: "That's kind of you dear, but just focus on studying and training, and stay safe."
		},
		{ question: "Can you tell me a story?", answer: "A long time ago, " }
	]
});

CharLianData[_home + "Dad"] = new Character({
	name: "Dad",
	about: "Used to be a warrior. Jolly and kind, but his mood seems to sour in the 10th month.",
	cst: 350,
	atk: 425,
	def: 250,
	agi: 325,
	int: 250,
	inf: 550,
	passive: [SkillNames.PAS_BEAR, SkillNames.PAS_WARRIOR, SkillNames.PAS_ROGUE, SkillNames.PAS_TACTICIAN],
	skill: [SkillNames.WARRIOR, SkillNames.ROGUE],
	logic: CombatLogicNames.WARRIOR,
	talk: [
		{ question: "Who are you?", answer: "Get back to work before I knock you on your head again." },
		{
			question: "Do you need help?",
			answer: "Haha, when you're stronger.",
			done: "You've done all I ever wanted."
		},
		{ question: "Can you tell me a story?", answer: "I " }
	],
	interact: {
		spar: { cost: 4, reward: { inf: 15, cst: 10, atk: 20, def: 5, agi: 10 } },
		quest: {
			about:
				"Years ago I wounded a beast called Yeoron. He eventually healed,\nand when I was fighting elsewhere, slew my brothers. I was injured trying to avenge them.\nKill Yeoron for me. He should be in the forest just outside of Tarein.",
			validReq: [{ spar: [_home + "Dad"] }],
			doneReq: [{ dead: ["World_ForestTarein_Yeoron"] }],
			reward: { inf: 150, rep: 25, item: "Cagnil" }
		}
	},
	doneReq: [{ quest: [_home + "Dad"] }]
});

// Dojo
CharLianData[_dojo + "StudentAtk"] = new Character({
	name: "Sword Student",
	about: "A student who specializes in attack studying under Gordon.",
	cst: 105,
	atk: 125,
	int: 90,
	passive: [SkillNames.PAS_SPEARMAN],
	skill: [SkillNames.BASIC, SkillNames.ATK_DSTAB],
	logic: CombatLogicNames.BASIC,
	talk: [
		{ question: "What are you doing?", answer: "Learning the way of the spear, the strongest offense." },
		{
			question: "What's attack good for?",
			answer: "Damage! Your attacks hurt more and might break through defense!"
		}
	],
	interact: {
		spar: { time: 2, reward: { inf: 2, atk: 10 } },
		train: { stat: "atk", multiplier: 1.0, time: 10 }
	},
	doneReq: [{ spar: [_dojo + "StudentAtk"] }]
});

CharLianData[_dojo + "StudentDef"] = new Character({
	name: "Shield Student",
	about: "A student who specializes in defense studying under Gordon.",
	cst: 120,
	def: 125,
	agi: 90,
	int: 90,
	passive: [SkillNames.PAS_INFANTRY],
	skill: [SkillNames.BASIC, SkillNames.DEF_PARRY],
	logic: CombatLogicNames.BASIC,
	talk: [
		{ question: "What are you doing?", answer: "Learning the way of the sword and shield, the strongest defense." },
		{
			question: "What's defense good against?",
			answer: "You take less damage and block fast, sneaky attacks better!"
		}
	],
	interact: {
		spar: { time: 2, reward: { inf: 2, def: 10 } },
		train: { stat: "def", multiplier: 1.0, time: 10 }
	},
	doneReq: [{ spar: [_dojo + "StudentDef"] }]
});

CharLianData[_dojo + "StudentAgi"] = new Character({
	name: "Dagger Student",
	about: "A student who specializes in agility studying under Gordon.",
	atk: 105,
	def: 80,
	agi: 125,
	passive: [SkillNames.PAS_THIEF],
	skill: [SkillNames.BASIC, SkillNames.AGI_BACKSTAB],
	logic: CombatLogicNames.BASIC,
	talk: [
		{ question: "What are you doing?", answer: "Learning the way of the dagger, the quickest offense." },
		{
			question: "What's agility good for?",
			answer: "You can choose when to attack, and attack fast before someone can hit you back!"
		}
	],
	interact: {
		spar: { time: 2, reward: { inf: 2, agi: 10 } },
		train: { stat: "agi", multiplier: 1.0, time: 10 }
	},
	doneReq: [{ spar: [_dojo + "StudentAgi"] }]
});

CharLianData[_dojo + "Teacher"] = new Character({
	name: "Gordon",
	about: "A kind, old retired soldier from Tarein. The head instructor of the dojo.",
	cst: 180,
	atk: 175,
	def: 250,
	agi: 165,
	int: 150,
	inf: 80,
	passive: [SkillNames.PAS_SPEARMAN, SkillNames.PAS_SOLDIER],
	skill: [SkillNames.SOLDIER, SkillNames.ATK_DSTAB, SkillNames.AGI_BACKSTAB],
	logic: CombatLogicNames.SOLDIER,
	talk: [
		{
			question: "What are you doing?",
			answer: "Training my body. Only when your body is strong, can you take more hits in combat."
		},
		{
			question: "Can you teach me how to parry an attack",
			answer: "Increase your defense first.",
			done: "I've already taught you."
		}
	],
	interact: {
		spar: { time: 3, reward: { inf: 10, cst: 20, passive: SkillNames.PAS_INFANTRY } },
		train: { stat: "cst", multiplier: 1.0, time: 10 },
		teachSkill: { skillId: SkillNames.DEF_PARRY, validReq: [{ def: 130 }], time: 25 },
		quest: {
			about: "Go and beat my students.",
			validReq: [{ atk: 100, def: 100, agi: 100 }],
			doneReq: [{ spar: [_dojo + "StudentAtk", _dojo + "StudentDef", _dojo + "StudentAgi"] }],
			reward: { inf: 1, atk: 10, def: 10, skill: SkillNames.ATK_DSTAB },
			doneText: "Use your new skill wisely. Go see Giqral in school to learn some agility skills."
		}
	},
	doneReq: [{ skill: [SkillNames.DEF_PARRY] }]
});

// School
CharLianData[_school + "StudentInf"] = new Character({
	name: "Political Student",
	about: "A student who is studying politics under Giqral.",
	int: 125,
	talk: [
		{ question: "How can I increase my influence?", answer: "Help other people! Defeat others in combat." },
		{
			question: "Can you introduce me to the town chief?",
			answer: "When your influence is higher.",
			done: "I already have!"
		}
	],
	interact: {
		quest: {
			about: "Convince Giqral to give you a copy of the book 'The History of Tarein'. ",
			validReq: [{}],
			doneReq: [{ item: ["Book_History_Tarein"] }],
			reward: { inf: 5, int: 10 },
			take: { item: ["Book_History_Tarein"] },
			doneText: "Okay, I'll introduce you to Toraq. You can find him in the town hall."
		}
	},
	doneReq: [{ quest: [_school + "StudentInf"] }]
});

CharLianData[_school + "StudentInt"] = new Character({
	name: "Tactics Student",
	about: "A student who is studying combat tactics under Giqral.",
	cst: 110,
	atk: 110,
	def: 110,
	agi: 115,
	int: 135,
	talk: [
		{ question: "What are you doing?", answer: "Studying battlefield tactics." },
		{
			question: "How do I defeat my opponents?",
			answer: "There are a lot of ways, but you should always observe them."
		},
		{
			question: "Can you teach me how?",
			answer: "Maybe when your intelligence is higher.",
			done: "I already taught you all I know."
		}
	],
	interact: {
		train: { stat: "int", multiplier: 1.0, time: 10 },
		teachSkill: { skillId: SkillNames.SPE_WAIT, validReq: [{ int: 120 }], time: 10 }
	},
	doneReq: [{ skill: [SkillNames.SPE_WAIT] }]
});

CharLianData[_school + "Teacher"] = new Character({
	name: "Giqral",
	about: "An old rogue. Old friends with Gordon. The head teacher of the school.",
	cst: 120,
	atk: 170,
	agi: 250,
	def: 150,
	int: 250,
	inf: 100,
	talk: [
		{
			question: "Why do they call you a rogue",
			answer: "Wouldn't you like to know?"
		},
		{
			question: "Can you teach me how to use the dagger?",
			answer: "Sure, if you beat Gordon afterwards.",
			done: "Hehehehee, that was great."
		},
		{
			question: "Do you need help?",
			answer: "The old man Gordon is annoying. Go defeat him in a spar for me and I'll give you this old book.",
			done: "Haha, not anymore. It was great seeing Gordon's face when he lost."
		}
	],
	interact: {
		teachSkill: {
			skillId: SkillNames.AGI_BACKSTAB,
			validReq: [{}],
			time: 25
		},
		quest: {
			about: "Go and beat Gordon in a spar.",
			validReq: [{}],
			doneReq: [{ spar: [_dojo + "Teacher"] }],
			reward: {
				inf: 10,
				agi: 10,
				item: "Book_History_Tarein"
			},
			doneText: "Hehe, that was fun."
		}
	},
	validReq: [{ quest: [_dojo + "Teacher"] }],
	doneReq: [{ quest: [_school + "Teacher"] }]
});

// Hall
CharLianData[_hall + "Messenger"] = new Character({
	name: "Messenger",
	about: "The local messenger.",
	cst: 140,
	agi: 120,
	int: 150,
	inf: 30
});

CharLianData[_hall + "Guard"] = new Character({
	name: "Guard",
	about: "A skilled infantryman who served under the town sheriff. The town guard.",
	cst: 200,
	atk: 150,
	def: 210,
	agi: 150,
	int: 125,
	inf: 90,
	passive: [SkillNames.PAS_WOLF, SkillNames.PAS_INFANTRY],
	skill: [SkillNames.BASIC, SkillNames.ATK_DSTAB, SkillNames.DEF_PARRY],
	logic: CombatLogicNames.BASIC,
	talk: [{ question: "Hi", answer: "Blah" }],
	interact: {
		spar: { time: 2, reward: { inf: 10, def: 20 } }
	},
	doneReq: [{ spar: [_hall + "Guard"] }]
});

CharLianData[_hall + "Sheriff"] = new Character({
	name: "Sheriff",
	about: "A soldier who served under the town chief, Toraq. The town sheriff.",
	cst: 400,
	atk: 250,
	def: 400,
	agi: 225,
	int: 225,
	inf: 300,
	passive: [SkillNames.PAS_WOLF, SkillNames.PAS_SOLDIER, SkillNames.PAS_MESSENGER],
	skill: [SkillNames.SOLDIER],
	logic: CombatLogicNames.SOLDIER,
	talk: [{ question: "Hi", answer: "Hi" }],
	interact: {
		train: { stat: "def", multiplier: 1.1, time: 11 },
		spar: { time: 4, reward: { inf: 20, def: 30 } }
	},
	validReq: [{ char: [_hall + "Guard"] }],
	doneReq: [{ spar: [_hall + "Sheriff"], quest: [_hall + "Sheriff"] }]
});

CharLianData[_hall + "Chief"] = new Character({
	name: "Toraq",
	about: "A retired knight. The chief of the town.",
	cst: 950,
	atk: 750,
	def: 950,
	agi: 550,
	int: 500,
	inf: 1500,
	passive: [SkillNames.PAS_BEAR, SkillNames.PAS_WARRIOR, SkillNames.PAS_KNIGHT],
	skill: [SkillNames.KNIGHT],
	logic: CombatLogicNames.KNIGHT,
	talk: [{ question: "Hi", answer: "Hi" }],
	interact: {
		spar: { time: 5, reward: { inf: 40, cst: 40, def: 40 } },
		quest: {
			about: "Promote the fame of Lian through yourself.",
			validReq: [{ inf: 200 }],
			doneReq: [{ inf: 1000 }],
			reward: { inf: 10, rep: 2, int: 10, item: "Letter_Boris" },
			doneText: "Thank you. Take this letter to Boris in Tarein and he'll help you learn a new skill."
		}
	},
	validReq: [{ char: [_school + "StudentInf"] }],
	doneReq: [{ spar: [_hall + "Chief"], quest: [_hall + "Chief"] }]
});

// Shop
CharLianData[_shop + "Customer"] = new Character({
	name: "Customer",
	about: "It looks like he really wants something on the shelf."
});

CharLianData[_shop + "Storekeeper"] = new Character({
	name: "Storekeeper",
	about: "A retired merchant. Spends the remainder of his days tending his store."
});

CharLianData[_center + "CrazyOldMan"] = new Character({
	name: "Crazy Old Man",
	about: "An insane old man.",
	cst: 10,
	def: 20,
	agi: 10,
	int: 0,
	talk: [
		{ question: "Hi?", answer: "They're coming, they're coming." },
		{
			question: "What's coming?",
			answer: "It's red, red, red, red.",
			done: "The eyes, they're red. Red. Red. RED."
		}
	],
	doneReq: [{ int: 1200 }]
});

export default CharLianData;
