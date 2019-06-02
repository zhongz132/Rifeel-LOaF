/**
 * Element.js by zhongz132@gmail.com
 *
 * Definition of each element object, and how to create and modify one.
 */

import verboseSettings from "./../../verboseSettings.js";
import Loc from "./../Locations/Location.js";

// Used to remember statsitics on build. Can help in debuggin
let _tries = 0;
let _success = 0;

// Prefix for all elements
let _elePrefix = "ELE_";

// Hash map from elementId to the appropriate object.
let _EleNames = {};

/**
 * Constructor for an element. These are usually characters which are interactable.
 *
 * Description of each member varible:
 *    elementId (internal): The unique elementId of the element.
 *    parentId (internal): The unique parentId of the element.
 *    name (Screen): The name the element will display on the game screen.
 *    about (Screen): The description of the element to display on the game screen.
 *    type (Logic): The type of character. This will determine stats, passives, and skills of a element.
 *    logic (Logic): The actions the character will take in a spar or battle.
 *    showReqs (Logic): Requirements to show the element.
 *    validReqs (Logic): Requirements for the element to be interactable.
 *    doneReqs (Logic): Requirements for the element to be marked as done.
 *    interactions (Logic/Screen): The interactions available to the character.
 */
function _Element(elementId, parentId, context) {
	this.elementId = elementId;
	this.parentId = parentId;
	this.name = "";
	this.about = "";
	this.type = "TYPE_NONE";
	this.logic = "LOGIC_BASIC";
	this.showReqs = [];
	this.validReqs = [];
	this.doneReqs = [];
	this.interactions = [];
	if (context) {
		if (context.name) {
			if (typeof context.name === "string") this.name = context.name;
			else console.log("Warning: Invalid name type.");
		} else console.log("Warning: Created an element,", elementId, "with no name.");
		if (context.about) {
			if (typeof context.about === "string") this.about = context.about;
			else console.log("Warning: Invalid about type.");
		} else console.log("Warning: Created an element,", elementId, "with no about.");
		if (context.type) {
			if (typeof context.type === "string") this.type = context.type;
			else console.log("Warning: Invalid type (element) type.");
		} else console.log("Warning: Created an element,", elementId, "with no type(element).");
		if (context.logic) {
			if (typeof context.logic === "string") this.logic = context.logic;
			else console.log("Warning: Invalid logic type.");
		} else console.log("Warning: Created an element,", elementId, "with no logic.");
		if (context.showReqs) {
			if (Array.isArray(context.showReqs)) this.showReqs = context.showReqs;
			else console.log("Warning: Invalid showReqs type.");
		}
		if (context.validReqs) {
			if (Array.isArray(context.validReqs)) this.validReqs = context.validReqs;
			else console.log("Warning: Invalid validReqs type.");
		}
		if (context.doneReqs) {
			if (Array.isArray(context.doneReqs)) this.doneReqs = context.doneReqs;
			else console.log("Warning: Invalid doneReqs type.");
		}
		if (context.interactions) {
			if (Array.isArray(context.interactions)) this.interactions = context.interactions;
			else console.log("Warning: Invalid interactions type.");
			console.log("Warning: Added interactions,", context.interactions, "to element", elementId, "at creation.");
		}
	} else {
		console.log("Warning: Created a game element", elementId, "with no context in,", parentId);
	}
	_EleNames[elementId] = this;
}

_Element.prototype.addInteraction = function(interactId) {
	this.interactions.push(interactId);
};

const Ele = {
	// Checks if the elementName is valid. Returns true if so, otherwise false.
	_validElementName(elementName) {
		if (!elementName) {
			console.log("Null Error: Element name is null.");
			return false;
		}
		if (typeof elementName !== "string") {
			console.log("Type error: Invalid elementName type,", elementName);
			return false;
		}
		if (elementName[0] === "_") {
			console.log("CRITICAL LOGIC ERROR: Element names can not start with _", elementName);
			return false;
		}
		if (elementName[elementName.length - 1]) {
			console.log("CRITICAL LOGIC ERROR: Element names can not end with _", elementName);
			return false;
		}
		return true;
	},

	// Gets the elementId from the elementName and parentId. Returns the elementId.
	_getElementId(elementName, parentId) {
		return parentId + elementName.toUpperCase();
	},

	// Checks if an element id exists. Returns true if so, false otherwise.
	_existElementId(elementId) {
		if (elementId in _EleNames) return true;
		return false;
	},

	newEle(elementName, parentId, context) {
		// Keep track of stats
		if (verboseSettings.statBuild && _tries % verboseSettings.statBuildFreq === 0) {
			console.log("Tried to build: " + _tries + " elements, successed on " + _success + ".");
		}
		_tries += 1;

		// Error checks
		// This also checks for a valid parentId, by design.
		if (!Loc.includes(parentId)) {
			console.log("Invalid parentId", parentId, "when creating element,", elementName);
			return "";
		}
		if (!_validElementName(elementName)) return "";
		let newElementId = _getElementId(elementName, parentId);
		if (_existElementId(newElementId)) {
			console.log("Logic Error: Duplicate element ids,", newElementId);
			return "";
		}

		new _Element(newElementId, parentId, context);
		if (Loc.addElement(parentId, newElementId)) {
			success += 1;
			return newElementId;
		} else {
			// This is really, really, bad. Something went horribly wrong. Please check.
			console.log("FATAL ERROR: PASSED ERROR CHECKS BUT FAILED TO ADD TO LOCATION ELEMENTS.");
			return "";
		}
	},

	/**
	 * Adds an interaction to an element. Takes an elementId and interactId. Returns the size of
	 * interactions.
	 */
	addInteraction(elementId, interactId) {
		_EleNames[elementId].addInteraction(interactId);
		return _EleNames[elementId].interactions.length;
	}
};

export default Ele;
