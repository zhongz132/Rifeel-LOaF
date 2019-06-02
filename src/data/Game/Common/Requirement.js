/**
 * Requirement.js by zhongz132@gmail.com
 *
 * Definition of the requirement object
 * Create a new requirement. We do not have an index of all the requirements.
 */

function Req(context) {
	this.cst                                   = 0;      // Type: number
	this.atk                                   = 0;      // Type: number....
	this.def                                   = 0;
	this.agi                                   = 0;
	this.int                                   = 0;
	this.inf                                   = 0;
	this.rep                                   = 0;
	this.gold                                  = 0;
	this.time                                  = 0;
	this.loc                                   = [];     // Type: array of locIds (string)
	this.ele                                   = [];     // Type: array of elementIds (string)
	this.interact                              = [];     // Type: array of interactIds (string)
	this.item                                  = [];     // Type: array of itemIds (string)
	this.skill                                 = [];     // Type: array of skillIds (string)
	if (context) {
		if (context.cst) {
			if (typeof context.cst === "number") this.cst = context.cst;
			else console.log("Warning: Invalid cst type.");
		}
		if (context.atk) {
			if (typeof context.atk === "number") this.atk = context.atk;
			else console.log("Warning: Invalid atk type.");
		}
		if (context.def) {
			if (typeof context.def === "number") this.def = context.def;
			else console.log("Warning: Invalid def type.");
		}
		if (context.agi) {
			if (typeof context.agi === "number") this.agi = context.agi;
			else console.log("Warning: Invalid agi type.");
		}
		if (context.int) {
			if (typeof context.int === "number") this.int = context.int;
			else console.log("Warning: Invalid int type.");
		}
		if (context.inf) {
			if (typeof context.inf === "nubmer") this.inf = context.inf;
			else console.log("Warning: Invalid inf type.");
		}
		if (context.rep) {
			if (typeof context.rep === "number") this.rep = context.rep;
			else console.log("Warning: Invalid rep type.");
		}
		if (context.gold) {
			if (typeof context.gold === "number") this.gold = context.gold;
			else console.log("Warning: Invalid gold type.");
		}
		if (context.time) {
			if (typeof context.time === "number") this.time = context.time;
			else console.log("Warning: Invalid time type.");
		}
		if (context.loc) {
			if (Array.isArray(context.loc)) this.loc = context.loc;
			else console.log("Warning: Invalid loc type.");
		}
		if (context.ele) {
			if (Array.isArray(context.ele)) this.ele = context.ele;
			else console.log("Warning: Invalid ele type.");
		}
		if (context.interact) {
			if (Array.isArray(context.interact)) this.interact = context.interact;
			else console.log("Warning: Invalid interact type.");
		}
		if (context.item) {
			if (Array.isArray(context.item)) this.item = context.item;
			else console.log("Warning: Invalid item type.");
		}
		if (context.skill) {
			if (Array.isArray(context.skill)) this.skill = context.skill;
			else console.log("Warning: Invalid skill type.");
		}
	} else {
		console.log("Warning: requirement created with no context.");
	}
};

export default Req;
