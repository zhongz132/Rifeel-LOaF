/**
 * gameInteractions.js by zhongz132@gmail.com
 *
 * Holds views for the interactions.
 */

import React from "react";

export default function gameInteractions(props) {
	// Currently interacting with a character
	if (props.gameState.dialCharId) {
		// Currently interacting with a character
		let curChar = props.gameState.dialCharId;
		let interact = props.gameState.CharData[curChar].interact;

		// hide the element
		function hide(id) {
			var x = document.getElementById(id);
			if (x) {
				if (x.style) {
					x.style.display = "none";
				}
			}
		}

		// Toggle the talk id given
		function display(id) {
			var x = document.getElementById(id);
			if (x.style.display === "none") {
				x.style.display = "block";
			} else {
				x.style.display = "none";
			}
		}

		// Checks if the character is done. If so, display different text
		function checkTalk(talk) {
			if (props.gameState.doneChar.includes(curChar)) {
				if (talk.done) {
					return talk.done;
				}
			}
			return talk.answer;
		}

		// Shows the dialog options
		//<button className="game-button" onClick={() => display(talk.answer)}>
		function showTalk() {
			return props.gameState.CharData[curChar].talk.map(talk => (
				<div key={talk.answer}>
					<button className="game-button" onClick={() => props.onDialCharTalk(checkTalk(talk))}>
						{talk.question}
					</button>
				</div>
			));
		}

		// train a stat
		function train() {
			if (interact.train) {
				return (
					<div id="char-interact">
						<button
							className="game-button"
							onClick={() =>
								props.onTrain(interact.train.stat, interact.train.multiplier, interact.train.time)
							}
						>
							Train {interact.train.stat.toUpperCase()}
						</button>
					</div>
				);
			}
		}

		// learn a skill
		function teachSkill() {
			if (
				interact.teachSkill &&
				props.gameState.validSkill.includes(interact.teachSkill.skillId) &&
				!props.gameState.player.skill.includes(interact.teachSkill.skillId)
			) {
				return (
					<div id="char-interact">
						<button
							className="game-button"
							onClick={() => props.onLearnSkill(interact.teachSkill.skillId, interact.teachSkill.time)}
						>
							Learn Skill
						</button>
					</div>
				);
			}
		}
		// start a quest

		function quest() {
			if (interact.quest) {
				// Quest is complete; do not show quest
				if (props.gameState.completeQuest.includes(curChar)) {
				}
				// Quest started and done, but not yet turned in
				else if (props.gameState.doneQuest.includes(curChar) && props.gameState.activeQuest.includes(curChar)) {
					let questComplete = false;
					function finishQuest() {
						if (!questComplete) {
							props.onCompleteQuest(curChar);
							questComplete = true;
						}
					}
					return (
						<div id="char-interact">
							<button className="game-button" onClick={() => finishQuest()}>
								Compelte Quest
							</button>
						</div>
					);
				}
				// Quest currently active and not done. Get the information
				else if (props.gameState.activeQuest.includes(curChar)) {
					return (
						<div id="char-interact">
							<button className="game-button" onClick={() => props.onInfoQuest(curChar)}>
								Quest
							</button>
						</div>
					);
				}
				// Quest is availble but not started yet
				else if (props.gameState.validQuest.includes(curChar)) {
					return (
						<div id="char-interact">
							<button className="game-button" onClick={() => props.onStartQuest(curChar)}>
								Start Quest
							</button>
						</div>
					);
				}
			}
		}

		// spar
		function spar() {
			if (interact.spar) {
				return (
					<div id="char-interact">
						<button className="game-button" onClick={() => props.onStartSB("Spar")}>Spar</button>
					</div>
				);
			}
		}

		// battle
		function battle() {
			if (interact.battle) {
				return (
					<div id="char-interact">
						<button>Battle</button>
					</div>
				);
			}
		}

		// Show the interaction options
		function showInt() {
			return (
				<div id="Game-interact">
					{train()}
					{teachSkill()}
					{quest()}
					{spar()}
					{battle()}
				</div>
			);
		}

		return (
			<div id="Game-interactions">
				<t id="underline">Character Actions</t>
				<br />
				{showTalk()}
				{showInt()}
			</div>
		);
	}

	// Currently at a location, and no character
	else if (props.gameState.dialLocId) {
		// location, but not character
		let targetLoc = props.gameState.dialLocId;
		return (
			<div id="Game-interactions">
				<t id="underline">Location Actions</t>
				<br />
				<button className="game-button" onClick={() => props.onSwitchLocation(targetLoc)}>
					Go to {props.gameState.LocData[targetLoc].name}
				</button>
			</div>
		);
	}

	// No location or character
	else {
		return (
			<div id="Game-interactions">
				<t id="underline">Actions</t>
				<br />
				<t>Select a location or character to interact with.</t>
			</div>
		);
	}
}
