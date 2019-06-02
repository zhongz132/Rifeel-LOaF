/**
 * gameSparBattle.js by zhongz132@gmail.com
 *
 * Holds views for spars and battles.
 */

import React from "react";

function gameSparBattle(props) {
	let curLoc = props.gameState.curLoc;

	function showExitInfo() {
		if (props.gameState.SBState.endResult) {
			return(
				<div id ="Game-nav">
					<button onClick={() => props.onEndSB()}>Finish</button>
				</div>
				);
		} else {
			return(
				<div id="Game-nav">
					<t>You can not leave while in combat.</t>
				</div>
				);
		}
	}

	function showOppInfo() {
		return (
			<div id="Game-characters">
				{props.gameState.CharData[props.gameState.curChar].name}
				<br />
				HP: {props.gameState.SBState.oppHp}
				<br />
				Energy: {props.gameState.SBState.oppEnergy}
				<br />
				Status:
				{props.gameState.SBState.oppStatus.map(status => (
					<t key={status}>
						<br />
						{status}
					</t>
				))}
				<br />
				Passives:
				{props.gameState.SBState.oppPassive.map(pass => (
					<t key={pass}>
						<br />
						{props.gameState.SkillData[pass].name}
					</t>
				))}
			</div>
		);
	}

	function showSkillInfo() {
		let skillTypes = ["ATK", "DEF", "AGI", "SPE"];

		function toggleDisplay(typeToShow) {
			let skillOp = document.getElementById("Skill-options");
			let skillNames = document.getElementById("Skill-names");
			let skillPress = document.getElementById("Skill-press");

			if (typeToShow === "NONE") {
				skillOp.style.display = "block";
				skillNames.style.display = "none";
				skillPress.style.display = "none";
			} else {
				let skillNamesToShow = document.getElementById("Skill-names-" + typeToShow);
				let skillPressToShow = document.getElementById("Skill-press-" + typeToShow);
				skillOp.style.display = "none";
				skillNames.style.display = "block";
				skillNamesToShow.style.display = "block";
				skillPress.style.display = "block";
				skillPressToShow.style.display = "block";

				for (var skillType in skillTypes) {
					if (skillTypes[skillType] !== typeToShow) {
						document.getElementById("Skill-names-" + skillTypes[skillType]).style.display = "none";
						document.getElementById("Skill-press-" + skillTypes[skillType]).style.display = "none";
					}
				}
			}
		}

		function showSkill() {
			console.log(props.gameState.SBState.playerSkill)
			return (
				<div id="Game-interactions">
					<t id="Skill-title">Skills:</t>
					<div id="Skill-options">
						<button onClick={() => toggleDisplay("ATK")}>Attack Skills</button>
						<br />
						<button onClick={() => toggleDisplay("DEF")}>Defense Skills</button>
						<br />
						<button onClick={() => toggleDisplay("AGI")}>Agility Skills</button>
						<br />
						<button onClick={() => toggleDisplay("SPE")}>Special Skills</button>
					</div>
					<div id="Skill-names" style={{ display: "none" }}>
						{skillTypes.map(skillType => (
							<div key={skillType} id={"Skill-names-" + skillType} style={{ display: "none" }}>
								{props.gameState.SBState.playerSkill
									.filter(skill => props.gameState.SkillData[skill].type === skillType)
									.map(skill => (
										<t key={skill}>
											{props.gameState.SkillData[skill].name}
											<br />
										</t>
									))}
							</div>
						))}
						<br />
						<button onClick={() => toggleDisplay("NONE")}>Return</button>
					</div>
					<div id="Skill-press" style={{ display: "none" }}>
						{skillTypes.map(skillType => (
							<div key={skillType} id={"Skill-press-" + skillType} style={{ display: "none" }}>
								{props.gameState.SBState.playerSkill
									.filter(skill => props.gameState.SkillData[skill].type === skillType)
									.map(skill => (
										<button key={skill} onClick={() => props.onProcessSBMove(skill)}>
											USE
										</button>
									))}
							</div>
						))}
					</div>
				</div>
			);
		}

		return showSkill();
	}

	if (curLoc === "Spar") {
	} else if (curLoc === "Battle") {
	}

	return (
		<div>
			{showExitInfo()}
			{showOppInfo()}
			{showSkillInfo()}
		</div>
	);
}

export default gameSparBattle;
