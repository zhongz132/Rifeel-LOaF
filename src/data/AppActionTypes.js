/**
 * AppActionTypes.js by zhongz132@gmail.com
 *
 * All the action types possible
 */

const ScreenActionTypes = {
	SWITCH_SCREEN: "SWITCH_SCREEN", // Changes main screens
	CHANGE_NAME: "CHANGE_NAME", // Changes player name
	CHANGE_GAMEID: "CHANGE_GAMEID" // Changes the game it load
};

const GameActionTypes = {
	// Highest level Location Controllers
	SWITCH_LOCATION: "SWITCH_LOCATION", // Switches the location the player is in
	DIAL_LOC_ABOUT: "DIAL_LOC_ABOUT", // Loads when clicked on a location. Loads information and the option to switch

	// Highest Level Character Controllers
	DIAL_CHAR_ABOUT: "DIAL_CHAR_ABOUT", // What happens the player chooses a Char to interact with
	DIAL_CHAR_TALK: "DIAL_CHAR_TALK",

	DIAL_SKILL_INFO: "DIAL_SKILL_INFO", // Show a skill info.

	// Controls which screen of the player that is currently being viewed
	SWITCH_PLAYER_VIEW: "SWITCH_PLAYER_VIEW",

	// Interact Controllers
	CHAR_INTERACT_TRAIN: "CHAR_INTERACT_TRAIN",
	CHAR_INTERACT_LEARN: "CHAR_INTERACT_LEARN",
	CHAR_INTERACT_START_QUEST: "CHAR_INTERACT_START_QUEST",
	CHAR_INTERACT_INFO_QUEST: "CHAR_INTERACT_INFO_QUEST",
	CHAR_INTERACT_COMPLETE_QUEST: "CHAR_INTERACT_COMPLETE_QUEST",
	CHAR_INTERACT_SB: "CHAR_INTERACT_SB", // CHANGES LOCATION
	CHAR_INTREACT_END_SB: "CHAR_INTREACT_END_SB",

	SB_PROCESS_MOVE: "SB_PROCESS_MOVE",

	// Player Controllers:
	PLAY_CHANGE_GOLD: "PLAY_CHANGE_GOLD", // Requires: ChangeVal, Time, ChangeAFF

	PLAY_ADD_INVENTORY: "PLAY_ADD_INVENTORY",
	PLAY_DEL_INVENTORY: "PLAY_DEL_INVENTORY"
};

const BattleActionTypes = {
	// Basic skills. Everyone has these
	BATTLE_ATK: "BATTLE_ATK",
	BATTLE_DEF: "BATTLE_DEF",
	BATTLE_SNEAK: "BATTLE_SNEAK",
	BATTLE_WAIT: "BATTLE_WAIT",
	BATTLE_BASIC: ["BATTLE_ATK", "BATTLE_DEF", "BATTLE_SNEAK", "BATTLE_WAIT", "BATTLE_ESCAPE"],

	// Intermmediate skills
	BATTLE_DSTAB: "BATTLE_DSTAB", 
	BATTLE_SMASH: "BATTLE_SMASH", 
	BATTLE_PARRY: "BATTLE_PARRY",
	BATTLE_BLOCK: "BATTLE_BLOCK",
	BATTLE_BACKSTAB: "BATTLE_BACKSTAB",
	BATTLE_POISON: "BATTLE_QUICKSTRIKE",

	BATTLE_INT1: ["BATTLE_DSTAB", "BATTLE_PARRY", "BATTLE_BACKSTAB"],
	BATTLE_INT2: ["BATTLE_DSTAB", "BATTLE_SMASH", "BATTLE_PARRY", "BATTLE_BLOCK", "BATTLE_BACKSTAB", "BATTLE_QUICKSTRIKE"],
	BATTLE_INTATK: ["BATTLE_DSTAB", "BATTLE_SMASH"],
	BATTLE_INTDEF: ["BATTLE_PARRY", "BATTLE_BLOCK"],
	BATTLE_INTAGI: ["BATTLE_BACKSTAB", "BATTLE_QUICKSTRIKE"],

	// Advanced skills
	BATTLE_CHARGE: "BATTLE_CHARGE",
	BATTLE_FINALBREATH: "BATTLE_FINALBREATH",
	BATTLE_DODGE: "BATTLE_DODGE",
	BATTLE_COUNTER: "BATTLE_COUNTER",
	BATTLE_EVISCERATE: "BATTLE_EVISCERATE",
	BATTLE_ASSASSINATE: "BATTLE_ASSASSINATE",

	// Special
	BATTLE_ESCAPE: "BATTLE_ESCAPE",
	BATTLE_INTIMIDATE: "BATTLE_INTIMIDATE",
	BATTLE_EXAMINE: "BATTLE_EXAMINE", 
	BATTLE_CHARGEUP: "BATTLE_CHARGEUP",
	BATTLE_BANDAGE: "BATTLE_BANDAGE",
	BATTLE_HEAL: "BATTLE_HEAL",
};

export { ScreenActionTypes, GameActionTypes, BattleActionTypes };