/**
 * GetSkillInfo.js by zhongz132@gmail.com
 *
 * Converts raw skill information to something readable.
 */

function getOnEvent(onSuccess) {
	let info = "";
	if (onSuccess.dmg) {
		info += "DMG: " + onSuccess.dmg + "; ";
	}

	if (onSuccess.status) {
		info += "Opp status:";
		for (let x in onSuccess.status) {
			info += " " + onSuccess.status[x];
		}
		info += "; ";
	}

	if (onSuccess.steal) {
		info += "Steal: " + onSuccess.steal + " energy; ";
	}

	if (onSuccess.selfstatus) {
		info += "Self status:";
		for (let x in onSuccess.selfstatus) {
			info += " " + onSuccess.selfstatus[x];
		}
		info += "; ";
	}

	if (onSuccess.energy) {
		info += "Gain: " + onSuccess.energy + " energy; ";
	}

	if (onSuccess.heal) {
		info += "Heal: " + onSuccess.heal + "*INT HP; ";
	}

	if (onSuccess.remove) {
		info += "Remove:";
		for (let x in onSuccess.remove) {
			info += " " + onSuccess.remove[x]
		}
		info += "; ";
	}

	if (onSuccess.end) {
		info += "End on: " + onSuccess.end + ".";
	} else {
		info = info.substring(0, info.length - 2);
		info += ".";
	}
	return info;
}

function GetSkillInfo(skill) {
	let bonus = skill.bonus;
	let onFail = skill.onFail;
	let onSuccess = skill.onSuccess;

	let info = "Costs " + skill.energy + " energy.";

	info += " ATK: " + bonus.atk + "; DEF: " + bonus.def + "; AGI: " + bonus.agi + "; INT: " + bonus.int + ".";
	if (Object.keys(onFail).length > 1) {
		info += "\n On Fail, ";
		info += getOnEvent(onFail);
	}

	info += "\n On success, ";

	info += getOnEvent(onSuccess);

	return info;
}

export default GetSkillInfo;
