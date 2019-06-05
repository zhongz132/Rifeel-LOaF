/**
 * Interaction.js by zhongz132@gmail.com
 *
 * Definition of each interaction object, and how to create and modify one.
 * There are six main types of interactions:
 *  Talk: "TLK": Not unique. Will be prefixed as INT_TLK_(parent)_n, where n is the next avaliable talk number.
                 Can not have children. For continous dialogs, it will be stored in a tree, with the root being
                 the first dialog. This will reduce crowding GameData.
 *  Learn: "LRN": Not unique. Will be prefixed as INT_LRN_(parent)_n, ". Can not have children.
 *  Quest: "QST": Not unique. Will be prefixed as INT_QST_(parent)_n, ". Can not have children.
 *  Spar: "SPR": Unique. Will be prefixed as INT_SPR_(parent). Can not have children.
 *  Battle: "BTL": Unique. Will be prefixed as INT_BTL_(parent). Can not have children.
 *  Trade: "TRD": Unique. WIll be prefixed as INT_TRD_(parent). Children are tradeable items.
 */

import verboseSettings from "./../../verboseSettings.js";
import GameObject, { _GameObject } from "./../Common/GameObject.js";
import Ele from "./../Elements/Element.js";
import { GameNames, GameData, _prefix, _interactionPrefix, _prefixToName } from "./../Data.js";

// Used to remember statsitics on build. Can help in debuggin
let _tries = 0;
let _success = 0;

// Prefix for all elements
let _intPrefix = _prefix.Interaction;

let _createSubInteraction = {
	Talk: function(context) {},

	// learnType: Either a skill, passive, or a stat (CST, ATK, DEF, AGI, INT)
	// learnValue: If a skill or passive, need a valid skill or passive. The caller will check this.
	//             If a stat, must be a number or a string convertable to a number.
	Learn: function(context) {
		this.learnType = undefined;
		this.learnValue = undefined;
		if (context.learnType && typeof context.learnType === "string") {
			if (context.learnValue === null || context.learnValue === undefined) {
				throw new Error("Must provide a learnValue with learnType");
			}
			this.learnType = context.learnType;
			// To learn a skill a passive
			if (context.learnType === _prefix.Skill || context.learnType === _prefix.Passive) {
				if (typeof context.learnValue !== "string") throw new TypeError("Skill name must be a string");
				if (!GameObject._idExists(context.learnValue))
					throw new ReferenceError("Skill does not exists in learn.");
				this.learnValue = context.learnValue;
			} else {
				if (typeof context.learnValue === "number") this.learnValue = context.learnValue;
				else if (typeof context.learnValue === "string") {
					try {
						this.learnValue = Number(context.learnValue);
					} catch (error) {
						throw error;
					}
				} else throw new TypeError("learnValue must be a number or string.");
			}
		}
	},

	// reward: A new reward object for finishing the quest.
	Quest: function(context) {
		this.reward = {};
		if (context.reward) {
			if (typeof context.reward === "object") this.reward = context.reward;
			else throw new TypeError("Reward of a quest must be a reward object");
		} else console.log("No reward provided for quest.");
	},

	// reward: A new reward object for defeating the opponent in a spar.
	Spar: function(context) {
		this.reward = {};
		if (context.reward) {
			if (typeof context.reward === "object") this.reward = context.reward;
			else throw new TypeError("Reward of a spar must be a reward object");
		} else console.log("No reward provided for spar.");
	},

	// reward: A new reward object for killing the opponent.
	Battle: function(context) {
		this.reward = {};
		if (context.reward) {
			if (typeof context.reward === "object") this.reward = context.reward;
			else throw new TypeError("Reward of a battle must be a reward object");
		} else console.log("No reward provided for battle.");
	},

	// costs: An array to hold the costs of each of the children.
	//        At creation, there will be no costs, and must add items after.
	Trade: function(context) {
		this.costs = [];
		if (context.costs) console.log("Costs appeared at the construction of an interaction. This is ignored");
	}
};

function _Interaction(interactId, parent, type, context) {
	_GameObject.call(this, interactId, parent, context);
	// This MUST be defined.
	this.type = type;
	if (context === null && context === undefined) {
		console.log("Warning: Created an interaction with no context.");
	} else {
		_createSubInteraction[_prefixToName[type]].call(this, context);
	}
}

/**
 * Private helpers
 */

let _createInteractId = function(type, parent) {
	// Just in case, make it upper case.
	type = type.toUpperCase();
	if (type === _interactionPrefix.Talk || type === _interactionPrefix.Learn || type === _interactionPrefix.Quest) {
		let i = 1;
		let n = Math.floor(Math.random() * Math.pow(10, i));
		let newInteractId = _intPrefix + "_" + type + "_" + parent + "_" + n.toString();
		// Generate a new key. This will only be slow when someone decides to add 100+ interactions to an element.
		// That should never happen.
		while (this._idExists(newInteractId)) {
			n = Math.floor(Math.random() * Math.pow(10, i));
			newInteractId = _intPrefix + "_" + type + "_" + parent + "_" + n.toString();
			i += 1;
		}
		return newInteractId;
	} else {
		let newInteractId = _intPrefix + "_" + type + "_" + parent;
		if (this._idExists(newInteractId)) throw new ReferenceError("Duplicate interaction type.");
		return _intPrefix + "_" + type + "_" + parent;
	}
};

let _validSubtype = function(subtype) {
	if (subtype in _interactionPrefix) return true;
	return false;
};

var Int = Object.create(GameObject);

Int["create"] = function(type, parent, context) {
	if (verboseSettings.statBuild && _tries % verboseSettings === 0) {
		console.log("Tried to build " + _tries + " elements and succeeded on " + _success + " of them.");
	}
	_tries += 1;
	if (!this._idExists(parent)) throw new ReferenceError("Parent element does not exist");
	if (!_validSubtype(type)) throw new ReferenceError("Invalid interaction subtype.");
	let newInteractId = _createInteractId(type, parent);
	let newInteraction = _Interaction(newInteractId, parent, type, context);
	GameData[newInteractId] = newInteraction;
	GameNames.Interaction[_prefixToName[type]][newInteractId] = newInteractId;
	Ele.addChildren(newInteractId, parent);
	_success += 1;
};

export default Int;
