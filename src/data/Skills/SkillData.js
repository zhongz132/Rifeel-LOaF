/**
 * SkillData.js by zhongz132@gmail.com
 *
 * All skill information for the game
 */

import Immutable from "immutable";
import SkillPassive from "./SkillPassive.js";
import SkillAtk from "./SkillAtk.js";
import SkillDef from "./SkillDef.js";
import SkillAgi from "./SkillAgi.js";
import SkillSpe from "./SkillSpe.js";

let SkillData = Immutable.Record({ ...SkillPassive, ...SkillAtk, ...SkillDef, ...SkillAgi, ...SkillSpe });

export default SkillData;
