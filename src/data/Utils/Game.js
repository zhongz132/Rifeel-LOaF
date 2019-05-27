/**
 * Game.js by zhongz132@gmail.com
 *
 * Base declaration and data of game element in the game
 */

import Immutable from "immutable";
import LocationData from "./../Locations/LocationData.js";
import CharacterData from "./../Characters/CharacterData.js";
import SkillData from "./../Skills/SkillData.js"
import Player from "./../Characters/Player.js";
import SBState from "./SBState.js";

const Game = Immutable.Record({
	gameId: -1, // Game Id, CIRTICAL WARNING: UNIQUE

	time: 0, // time elapsed. 10 units of time is one day.
	gold: 0, // Current gold

	player: new Player(),
	playerView: "overview", // overview, skills, or inventory

	prevLoc: "World_Lian",
	curLoc: "World_Lian", // Current location (start at Lian)
	dialLocId: "", // Dialog display of the location.
	validLoc: ["World_Lian"], // Start of with Lian. Program will populate the rest.
	LocData: new LocationData(),

	curChar: "", // Current character interaction. By default, do not interact with anyone
	dialCharId: "", // Dialog display for a character. Takes precedence over location, other than battle/spar
	dialSysText: "",
	dialCharText: "",
	validChar: [], // Valid characters
	deadChar: [], // Dead characters. Everyone starts alive
	doneSpar: [], // Defeated the character in a spar
	doneChar: [], // Characters who are done.
	validSkill: [], // The skill is valid to learn. Note: skills are stored in player.

	validQuest: [], // The quest is valid to take.
	activeQuest: [], // Active quests
	doneQuest: [], // Quest is done, but has yet to be turned in.
	completeQuest: [], // The quest is complete and turned in.

	CharData: new CharacterData(),

	SkillData: new SkillData(),
	SBState: new SBState(), // spar battle data
});

export default Game;
