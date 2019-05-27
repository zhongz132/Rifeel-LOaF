/**
 * CharacterData.js by zhongz132@gmail.com
 *
 * Character information for the game
 */

import Immutable from "immutable";
import CharLianData from "./CharLianData.js";

const CharacterData = Immutable.Record({...CharLianData})

export default CharacterData;
