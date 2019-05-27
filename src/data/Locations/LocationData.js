/**
 * LocationData.js by zhongz132@gmail.com
 *
 * All Location information for the game.
 */

import Immutable from "immutable";
import LocBaseData from "./LocBaseData.js";
import LocWorldData from "./LocWorldData.js";
import LocLianData from "./LocLianData.js";
import LocTareinData from "./LocTareinData.js";
import LocId from "./LocIdGen.js";

function setVals(locDict) {
	for (var key in locDict) {
		locDict[key] = locDict[key]
			.set("children", LocId.getChildrenId(key))
			.set("locId", key)
			.set("parent", LocId.getParentId(key));
	}
}

setVals(LocBaseData);
setVals(LocWorldData);
setVals(LocLianData);
setVals(LocTareinData);

const LocationData = Immutable.Record({ ...LocBaseData, ...LocWorldData, ...LocLianData, ...LocTareinData });

export default LocationData;
