/**
 * Element.js by zhongz132@gmail.com
 *
 * Definition of each element object, and how to create and modify one.
 * Each element MUST have a location as a parent. 
 * Each element is unique, and each element name within the scope of a location must be unique.
 * Elements may only have interactions as their children. This will be handeled by the caller.
 * Element names are ELE_(parent)_(elementName)
 */

import verboseSettings from "./../../verboseSettings.js";
import GameObject, { _GameObject } from "./../Common/GameObject.js";
import Loc from "./../Locations/Location.js";
import { GameNames, GameData, _prefix, _prefixToName } from "./../Data.js";

// Used to remember statsitics on build. Can help in debuggin
let _tries = 0;
let _success = 0;

// Prefix for all elements
let _elePrefix = _prefix.Element;

/**
 * Constructor for an element. These are usually characters which are interactable.
 *
 * Description of each member varible:
 *    Inherit the same for a regular object, EXCEPT:
 *    children (Logic): Holds only interaction Ids.
 *
 *    type (Logic): The type of character. This will determine stats, passives, and skills of a element.
 *    logic (Logic): The actions the character will take in a spar or battle.
 */
function _Element(elementId, parent, context) {
	_GameObject.call(this, elementId, parent, context);
	this.type = "TYPE_NONE";
	this.logic = "LOGIC_BASIC";
	if (context) {
		if (context.type && typeof context.type === "string") this.type = context.type;
		if (context.logic && typeof context.logic === "string") this.logic = context.logic;
	} else {
		console.log("Warning: Created a game element", elementId, "with no context in,", parent);
	}
}

let _createElementId = function(elementName, parent) {
	return _elePrefix + "_" + parent + "_" + elementName.toUpperCase();
}

var Ele = Object.create(GameObject);

Ele["create"] = function(elementName, parent, context) {
	if (verboseSettings.statBuild && _tries % verboseSettings === 0) {
		console.log("Tried to build " + _tries + " elements and succeeded on " + _success + " of them.");
	}
	_tries += 1;
	// Error checks
	if (this._getObjType(parent) !== _prefix.Location) throw new ReferenceError("Parent of element not a location.");
	if (!Loc._idExists(parent)) throw new ReferenceError("Parent location does not exist.");
	let newElementId = _createElementId(elementName, parent);
	if (this._idExists(newElementId)) throw new ReferenceError("Duplicate element name in location.");

	let newElement = new _Element(newElementId, parent, context);
	GameData[newElementId] = newElement;
	GameNames.Element[newElementId] = newElementId;
	// Add to parent
	Loc.addElement(newElementId, parent);
	_success += 1;
};

// Adds an interaction to the children. Error check for interactId should be only done by the caller
Ele["addChildren"] = function(interactId, parent) {
	if (!this._idExists(parent)) throw new ReferenceError("Parent element does not exist.");
	GameData[parent].children.push(interactId);
}

export default Ele;
