/**
 * Game.js by zhongz132@gmail.com
 *
 * Controls the game.
 */

import GameObject from "./Common/GameObject.js";
import LocationObject from "./Locations/Location.js";
import ElementObject from "./Elements/Element.js";
import InteractionObject from "./Interactions/Interaction.js";
import { GameData } from "./Data.js";
/*
var fs = require("./defuntdata.json");

for (let i in fs) {
	console.log(i, fs[i]);
}
*/

var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(GameData));

var a = document.createElement("a");
a.href = "data:" + data;
a.download = "data.json";
a.innerHTML = "download JSON";

var container = document.getElementById("container");
container.appendChild(a);

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
	Element: ElementObject,
	Interaction: InteractionObject,

	LoadGame: function() {},

	SaveGame: function() {},

	LoadDeveloper: function() {},

	SaveGameVersion: function() {
		console.log("Saving: ", GameData);
		data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(GameData));
		a.href = "data:" + data;
	},

	printData: function() {
		console.log(GameData);
	}
};

export default Game;
