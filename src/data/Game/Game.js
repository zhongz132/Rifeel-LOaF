/**
 * Game.js by zhongz132@gmail.com
 *
 * Controls the game.
 */

import GameObject from "./Common/GameObject.js";
import LocationObject from "./Locations/Location.js";

/**
 * TODO:
 *
 * 1. Ensure that seamless transition works between objects and JSON strings.
 * 2.
 *
 */

/*
 * Holds all game functions.
 */
const Game = {
	GameObject: GameObject,
	Location: LocationObject,

	LoadGame: function() {

	},
	
	LoadDeveloper: function() {

	}
};

export default Game;
