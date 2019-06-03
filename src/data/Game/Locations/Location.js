/**
 * Location.js by zhongz132@gmail.com
 *
 * Definition of the location object and its supporting funtions.
 * Generate new location, get location information, and maintain the relationship between them.
 * Creating a new location is expensive, but everything else can be done in average O(1) through hash lookup.
 * Note: locIds (string) will all start with "LOC_", then the location name, but the path should never include "LOC"
 */

import verboseSettings from "./../../verboseSettings.js";
import { _prefix, GameNames, GameData } from "./../Data.js";
import GameObject, { _GameObject } from "./../Common/GameObject.js";

// Keep track of how many succesful and failed location builds. Useful for debugging/stats
let _tries = 0;
let _success = 0;

// Definition of the prefix for all locations
let _locPrefix = _prefix.Location;
let _baseId = "LOC";

/**
 * Constructor for a location. Each location requires a unique path and parent, which will be handeled internally.
 *
 * Description of each member variable:
 *    locId (Internal): The locId of the current location. Needed for creating children efficeiently.
 *    parent (Internal): The parent locId of the current location.
 *    children (Internal): The children locIds of the current location. We are garunteed each child is unique
 *                         by design. Furthermore, we usually only push to the back. Only in dev tools, and
 *                         rarely so, do we ever want to delete.
 *    name (Screen): The name to display in the game screen of the location.
 *    about (Screen): A description of the location to display in the game screen.
 *    showReqs (Logic): Requirements to show the location.
 *                      *Pretty rarely used, but makes sense to exist.*
 *    validReqs (Logic): Requirements for the location to be valid (enterable by player).
 *    elements (Logic): The elements accessible in this location. Maps elementId to the display name on game screen.
 *                      We check for uniquenes.
 *                      *Can add to this externally.*
 */
function _Location(locId, parent, context) {
	_GameObject.call(this, locId, parent, context);
	this.elements = []; // Type: array of strings (elementId)
	if (context) {
		if (context.elements) {
			if (Array.isArray(context.elements)) this.elements = context.elements;
			console.log("Warning: Added elements in location constructor");
		}
	} else if (locId !== "LOC") {
		console.log("Warning: Created a new location with no context:", locId);
	}
}

// The base location. The parent to the highest level locations. Should never be referenced.
var _baseLoc = new _Location(_baseId, undefined, undefined);
GameData[_baseId] = _baseLoc;
GameNames.Location[_baseId] = _baseId;

/**
 * Functions which are supported by location.
 */
var Loc = Object.create(GameObject);

/**
 * Helper functions, which will never be needed anywhere else. Thus we do not export
 */
let createLocId = function(locName, parent) {
	locName = locName.toUpperCase();
	return parent + "_" + locName;
}

/**
 * Overwritten functions.
 */

// Is this needed?
/*
Loc["_idExists"] = function(locId) {
	if (locId in GameNames.Location) return true;
	return false;
};
*/

Loc["_idExists"] = function(locId) {
	if (locId in GameNames.Location) return true;
	return false;
}

// No error check. This should always be done by the caller.
Loc["addChildren"] = function(locId, parent) {
	GameData[parent].children.push(locId);
}

// TODO: MAYBE CHANGE WHAT THIS DOES
Loc["setChildren"] = function(locId, children) {
	if (!this._idExists(locId)) throw new ReferenceError("Id does not exist,", locId);
	console.log("Warning: Setting children without properly deleting them may cause unreferend locations.")
	GameData[locId].children = children;
}

// No error check. This should always be done by the caller.
Loc["addElement"] = function(elementId, parent) {
	if (!this._idExists(parent)) throw new ReferenceError("Location to add element does not exist.");
	GameData[parent].elements.push(elementId);
}

Loc["create"] = function(locName, parent, context) {
	if (verboseSettings.statBuild && _tries % verboseSettings === 0) {
		console.log("Tried to build " + _tries + " locations and succeeded on " + _success + " of them.");
	}
	_tries += 1;
	if (!this._idExists(parent)) throw new ReferenceError("Parent does not exist,", parent);
	let newLocId = createLocId(locName, parent);
	if (this._idExists(newLocId)) throw new ReferenceError("Duplicate keys,", newLocId);

	// Double check error pased. Now to create the object.
	let newLocation = new _Location(newLocId, parent, context);
	GameData[newLocId] = newLocation;
	GameNames.Location[newLocId] = newLocId;
	// Add the childId to the parent's children.
	this.addChildren(newLocId, parent);
	_success += 1;
};

export default Loc;
