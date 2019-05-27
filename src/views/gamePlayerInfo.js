/**
 * gamePlayerInfo.js by zhongz132@gmail.com
 *
 * Holds views for the player info
 */

import React from "react";

export default function gamePlayerInfo(props) {
	function showPlayerInfo() {
		if (
			props.gameState.playerView === "overview" &&
			(props.gameState.curLoc === "Spar" || props.gameState.curLoc === "Battle")
		) {
			return (
				<div>
					HP: {props.gameState.SBState.playerHp}
					<br />
					Energy: {props.gameState.SBState.playerEnergy}
					<br />
					ATK: {props.gameState.SBState.playerAtk}
					<br />
					DEF: {props.gameState.SBState.playerDef}
					<br />
					AGI: {props.gameState.SBState.playerAgi}
					<br />
					INT: {props.gameState.SBState.playerInt}
					<br />
					Status:
					{props.gameState.SBState.playerStatus.map(status => (
						<t key={status}>
							<br />
							{status}
						</t>
					))}
					<br />
					Passives:
					{props.gameState.SBState.playerPassive.map(pass => (
						<t key={pass}>
							<br />
							{props.gameState.SkillData[pass].name}
						</t>
					))}
				</div>
			);
		} else if (props.gameState.playerView === "overview") {
			return (
				<div>
					Gold: {props.gameState.gold}
					<br />
					Health: {props.gameState.player.health}
					<br />
					Constitution: {props.gameState.player.cst}
					<br />
					Attack: {props.gameState.player.atk}
					<br />
					Defense: {props.gameState.player.def}
					<br />
					Agility: {props.gameState.player.agi}
					<br />
					Intelligence: {props.gameState.player.int}
					<br />
					Influence: {props.gameState.player.inf}
					<br />
					Reputation: {props.gameState.player.rep}
					<br />
					Passives: {props.gameState.player.passive}
				</div>
			);
		}
	}

	// Inventory. Only okay in not spar or battle
	function showInventory() {
		if (props.gameState.playerView === "inventory") {
			return (
				<div>
					Inventory: {props.gameState.player.inventory}
					<br />
					TODO
				</div>
			);
		}
	}

	function showSkills() {
		let skillTypes = ["ATK", "DEF", "AGI", "SPE"];
		let skillsToShow = undefined;
		if (
			(props.gameState.curLoc === "Spar" || props.gameState.curLoc === "Battle") &&
			props.gameState.playerView === "skills"
		) {
			skillsToShow = props.gameState.SBState.playerSkill;
		} else {
			skillsToShow = props.gameState.player.skill;
		}

		function toggleDisplay(typeToShow) {
			let skillOp = document.getElementById("Skill-options-info");
			let skillNames = document.getElementById("Skill-names-info");

			if (typeToShow === "NONE") {
				skillOp.style.display = "block";
				skillNames.style.display = "none";
			} else {
				let skillNamesToShow = document.getElementById("Skill-names-info-" + typeToShow);
				skillOp.style.display = "none";
				skillNames.style.display = "block";
				skillNamesToShow.style.display = "block";

				for (var skillType in skillTypes) {
					if (skillTypes[skillType] !== typeToShow) {
						document.getElementById("Skill-names-info-" + skillTypes[skillType]).style.display = "none";
					}
				}
			}
		}

		function showSkill() {
			return (
				<div>
					<t id="Skill-title-info">Skills:</t>
					<div id="Skill-options-info">
						<button onClick={() => toggleDisplay("ATK")}>Attack Skills</button>
						<br />
						<button onClick={() => toggleDisplay("DEF")}>Defense Skills</button>
						<br />
						<button onClick={() => toggleDisplay("AGI")}>Agility Skills</button>
						<br />
						<button onClick={() => toggleDisplay("SPE")}>Special Skills</button>
					</div>
					<div id="Skill-names-info" style={{ display: "none" }}>
						{skillTypes.map(skillType => (
							<div key={skillType} id={"Skill-names-info-" + skillType} style={{ display: "none" }}>
								{skillsToShow
									.filter(skill => props.gameState.SkillData[skill].type === skillType)
									.map(filteredSkill => (
										<div key={filteredSkill}>
											<button onClick={() => props.onDialSkillInfo(filteredSkill)}>
												{props.gameState.SkillData[filteredSkill].name}
											</button>
										</div>
									))}
							</div>
						))}
						<br />
						<button onClick={() => toggleDisplay("NONE")}>Return</button>
					</div>
				</div>
			);
		}

		if (props.gameState.playerView === "skills") {
			return showSkill();
		}
	}

	// Actual screen
	if (props.gameState.curLoc !== "Spar" && props.gameState.curLoc !== "Battle") {
		return (
			<div id="Game-playerinfo">
				<button className="game-button" onClick={() => props.onSwitchPlayerView("overview")}>
					Player
				</button>
				<button className="game-button" onClick={() => props.onSwitchPlayerView("inventory")}>
					Inventory
				</button>
				<button className="game-button" onClick={() => props.onSwitchPlayerView("skills")}>
					Skills
				</button>
				{showPlayerInfo()}
				{showInventory()}
				{showSkills()}
			</div>
		);
	} else {
		return (
			<div id="Game-playerinfo">
				<button className="game-button" onClick={() => props.onSwitchPlayerView("overview")}>
					Player
				</button>
				<button className="game-button" onClick={() => props.onSwitchPlayerView("skills")}>
					Skills
				</button>
				{showPlayerInfo()}
				{showSkills()}
			</div>
		);
	}
}
