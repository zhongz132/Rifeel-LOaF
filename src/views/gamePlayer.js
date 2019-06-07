/**
 * App.js by zhongz132@gmail.com
 *
 * Holds views for the player information in the game main.
 */

import React from "react";

function gamePlayer(props) {
	let playerViewHandler = {};

	// Render of info
	playerViewHandler[props.Data.PlayerViewNames.INFO] = function() {
		let playerStatus = "Unknown";
		if (props.gameState.health >= 1.00) {
			playerStatus = "Perfect";
		}
		else if (props.gameState.health <= 0.00) {
			playerStatus = "Dead";
		}
		else if (props.gameState.health <= 0.20) {
			playerStatus = "Near Death";
		}
		else if (props.gameState.health <= 0.50) {
			playerStatus = "Critical";
		}
		else if (props.gameState.health <= 0.80) {
			playerStatus = "Injured";
		}
		else if (props.gameState.health < 1.00) {
			playerStatus = "Healthy";
		}
		return (
			<section id="Game-player-info">
				Health: {playerStatus}
				<br/>
				CST: {props.gameState.cst}
				<br/>
				ATK: {props.gameState.atk}
				<br/>
				DEF: {props.gameState.def}
				<br/>
				AGI: {props.gameState.agi}
				<br/>
				INT: {props.gameState.int}
				<br/>
				INF: {props.gameState.inf}
				<br/>
				REP: {props.gameState.rep}
			</section>
			)
	};

	// Call one of the player information views. If it does not exist, or is not defined, default is Info.
	function renderInfo() {
		if (props.gameState.curPlayerView in playerViewHandler) {
			return playerViewHandler[props.gameState.curPlayerView]();
		}
		else return playerViewHandler[props.Data.PlayerViewNames.INFO]();
	};

	return (
		<section id="Game-player">
			<section className="Game-part-header">
				<div className="btn-group">
					<button>Info</button>
					<button>Skill</button>
					<button>Inven</button>
					<button>Equip</button>
					<button>Quest</button>
				</div>
			</section>
			{renderInfo()}
		</section>
	);
}

export default gamePlayer;