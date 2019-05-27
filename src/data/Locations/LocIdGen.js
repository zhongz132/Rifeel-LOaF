/**
 * LocIdGenjs by zhongz132@gmail.com
 *
 * Generated unique location Ids
 */

const locIds = [];

const LocId = {
	getId(path) {
		if (path.length > 0) {
			let returnId = path.reduce((curPath, next) => curPath + "_" + next);
			return returnId;
		} else {
			console.log("Error: Tried to get the locId of empty path in genLocId.getId");
			return null;
		}
	},
	genId(path) {
		let newId = this.getId(path);
		if (locIds.includes(newId)) {
			console.log("Critical Error: Repeating key: " + newId);
			return null;
		} else if (newId[newId.length - 1] === "_")
			console.log("Error: Locations can not have no key.");
		else {
			//locIds = [...locIds, newId];
			locIds.push(newId);
			return newId;
		}
	},
	_getAndCheckParentId(path) {
		path.pop();
		if (path.length === 0) {
			// Is base location
			return "";
		}
		let parentId = this.getId(path);
		if (locIds.includes(parentId)) {
			return parentId;
		} else {
			console.log("Critical Error: No parent key: " + parentId);
			return null;
		}
	},
	getParentId(locId) {
		if (locId === null) {
			console.log("Critical Error: Tried to get the parent of a null object in genLocId.getParentId.");
			return null;
		} else if (typeof locId === "object" && locId.length > 0) {
			if (!locIds.includes(this.getId(locId))) {
				console.log("Error: Invalid location path: " + locId + " given in genLocId.getParentId");
				return null;
			}
			let path = locId;
			return this._getAndCheckParentId(path);
		} else if (locId && typeof locId === "string") {
			if (!locIds.includes(locId)) {
				console.log("Error: Invalid locId: " + locId + " given in genLocId.getParentId");
				return null;
			}
			let path = locId.split("_");
			return this._getAndCheckParentId(path);
		} else if (typeof locId !== "object" && typeof locId !== "string") {
			console.log("Error: Using genLocId.getParentId input type unrecognized");
			return null;
		} else {
			return null; // Empty or a base. This behavior is okay
		}
	},
	_getChildrenHelper(locId) {
		let sliceIdx = locId.length + 1;
		if (!locId) {
			return locIds.filter(id => !id.includes("_"));;
		}
		if (locIds.length > 0 && sliceIdx >= 0) {
			return locIds.filter(id => id.startsWith(locId + "_") && !id.slice(sliceIdx).includes("_"));;
		}
	},
	getChildrenId(locId) {
		if (locId === null) {
			console.log("Critical Error: Tried to get the children of a null object in genLocId.getChildrenId.");
			return null;
		} else if (typeof locId === "string") {
			if ((!locIds.includes(locId) && locId)) {
				console.log("Invalid locId: " + locId + " given in genLocId.getChildrenId");
				return null;
			}
			return this._getChildrenHelper(locId);
		} else if (typeof locId === "object") {
			let newLocId = this.getId(locId);
			if (newLocId && !locIds.includes(newLocId)) {
				console.log("Invalid location path: " + locId + " given in genLocId.getChildrenId");
				return null;
			} else if (newLocId === null) {
				console.log(
					"Critical Error: Tried to get the children of a null object in genLocId.getChildrenId through path."
				);
				return null;
			}
			return this._getChildrenHelper(newLocId);
		}
	}
};

export default LocId;
