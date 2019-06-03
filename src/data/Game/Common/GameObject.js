/**
 * GameObject.js by zhongz132@gmail.com
 *
 * Base definition of all game objects. Holds members all game objects will inherit.
 */

import { _prefix, _prefixToName, GameData, GameNames } from "./../Data.js";
//import Util from "./Util.js";

/**
 * The template for any game object.
 * Should only be called within a consructor for another class.
 */
export function _GameObject(id, parent, context) {
	this.id = id;
	this.parent = parent;
	// We should never create an object with children in it.
	this.children = [];
	this.name = "";
	this.about = "";
	this.showReqs = [];
	this.validReqs = [];
	this.doneReqs = [];
	if (typeof context === "object") {
		if (context.name) this.name = context.name;
		else console.log("Warning: Created an object,", id, "with no name.");
		if (context.about) this.about = context.about;
		else console.log("Warning: Created an object,", id, "with no about.");
		if (context.showReqs) this.showReqs = context.showReqs;
		if (context.validReqs) this.validReqs = context.validReqs;
		if (context.doneReqs) this.doneReqs = context.doneReqs;
	} else console.log("Warning: Created an object,", id, "with no context.");
}

/**
 * Acts like the prototype to _GameObject.
 */
const GameObject = {
	_validateString: function(input) {
		if (input === null) return false;
		if (input === undefined) return false;
		if (typeof input !== "string") return false;
		if (input.length === 0) return false;
		return true;
	},

	_idExists: function(id) {
		if (id in GameData) return true;
		return false;
	},

	_getObjType: function(id) {
		return id.substring(0, 3);
	},

	_getObjSubType: function(id) {
		return id.substring(4, 7);
	},

	// This is called by delete. It garuntees that the parent is also deleted, so we do no need
	// to dereference in the parent.
	_delete: function(id) {
		if (!this._idExists(id)) throw new ReferenceError("Id does not exist,", id);
		for (let i in GameData[id].children) {
			this._delete(GameData[id].children[i]);
		}
		let objectType = this._getObjType(id);
		let objectSubType = undefined;
		if (objectType === _prefix.Location) {
			for (let i in GameData[id].elements) {
				this.delete(GameData[id].elements[i]);
			}
		}
		if (objectType === _prefix.Interaction || objectType === _prefix.Item || objectType === _prefix.Skill) {
			objectSubType = this._getObjSubType(id);
		}
		objectType = _prefixToName[objectType];
		console.log(objectType, id);
		if (objectSubType !== undefined) {
			objectSubType = _prefixToName[objectSubType];
			delete GameNames[objectType][objectSubType][id];
		} else delete GameNames[objectType][id];
		delete GameData[id];
	},

	// Create a new game object. This is just a template for the rest. Includes members every other
	// game object will have.
	create: function(id, parentId, context) {
		throw new ReferenceError("Invalid call of create", id);
	},

	// WARNING: DELETES ALL CHILDREN AND EXTENDED CHILDREN
	// WARNING: TAKES O((objects)*depth) time.
	// WARNING: THIS ACTION IS CURRENTLY IRREVERSABLE
	delete: function(id) {
		if (!this._idExists(id)) throw new ReferenceError("Id does not exist,", id);
		console.log("Warning: Deleted object", id, "and all objects reliant on it.");
		let parentId = GameData[id].parent;
		// Recursive delete
		this._delete.call(this, id);
		// Remove the element from the parent's children
		// This is inefficient, as linear time search, but we need to perserve order.
		// Thankfully, there should never be more than 10-11 children in an object, so it does not
		// justify building an object and array to support lienar time search.
		if (this._getObjType(id) === _prefix.Element){
			GameData[parentId].elements.splice(GameData[parentId].elements.indexOf(id), 1);
		} else GameData[parentId].children.splice(GameData[parentId].children.indexOf(id), 1); 

	},

	// Get the parent id. All objects will have a parent member, but some will be undefined. This is okay.
	getParent: function(id) {
		if (this._idExists(id)) return GameData[id].parent;
		throw new ReferenceError(id);
	},

	// Should NEVER call this from the Game module. Throw an error.
	setParent: function(id, parent) {
		throw new ReferenceError("Invalid call of setParent:", id);
	},

	// Get the children ids. All objects will have a children member, but some will be undefined. This is okay.
	getChildren: function(id) {
		if (this._idExists(id)) return GameData[id].children;
	},

	// Should NEVER call this from Game module. Throw an error.
	setChildren: function(id, childrenId) {
		throw new ReferenceError("Invalid call of setChildren:", id);
	},

	// Should NEVER call this from Game module. Throw an error.
	addChildren: function(id, childrenId) {
		throw new ReferenceError("Invalid call of addChildren:", id);
	},

	// Getter function for name. Valid on all game objects. On success return name, else return emptystring.
	getName: function(id) {
		if (this._idExists(id)) return GameData[id].name;
		throw new ReferenceError(id);
	},

	// Error check for valid name is done on user input through validateString. No need to repeat
	setName: function(id, name) {
		if (this._idExists(id)) {
			GameData[id].name = name;
			return true;
		}
		throw new ReferenceError(id);
	},

	getAbout: function(id) {
		if (this._idExists(id)) return GameData[id].about;
		throw new ReferenceError(id);
	},

	setAbout: function(id, about) {
		if (this._idExists(id)) {
			GameData[id].about = about;
			return true;
		}
		throw new ReferenceError(id);
	},

	getShowReqs: function(id) {
		if (this._idExists(id)) return GameData[id].showReqs;
		throw new ReferenceError(id);
	},

	setShowReqs: function(id, showReqs) {
		if (this._idExists(id)) {
			GameData[id].showReqs = showReqs;
			return true;
		}
		throw new ReferenceError(id);
	},

	getValidReqs: function(id) {
		if (this._idExists(id)) return GameData[id].validReqs;
		throw new ReferenceError(id);
	},

	setValidReqs: function(id, validReqs) {
		if (this._idExists(id)) {
			GameData[id].validReqs = validReqs;
			return true;
		}
		throw new ReferenceError(id);
	},

	getDoneReqs: function(id) {
		if (this._idExists(id)) return GameData[id].doneReqs;
		throw new ReferenceError(id);
	},

	setDoneReqs: function(id, doneReqs) {
		if (this._idExists(id)) {
			GameData[id].doneReqs = doneReqs;
			return true;
		}
		throw new ReferenceError(id);
	}
};

export default GameObject;
