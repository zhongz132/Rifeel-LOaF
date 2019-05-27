/**
 * gameScreen.js by zhongz132@gmail.com
 *
 * Holds views for the game screen.
 */

import React from "react";
import gamePlayerInfo from "./gamePlayerInfo.js";
import gameNav from "./gameNav.js";
import gameChars from "./gameChars.js";
import gameInteractions from "./gameInteractions.js";
import gameSparBattle from "./gameSparBattle.js";

// GAME SCREEN BASE
function gameScreen(props) {
	if (props.gameState.curLoc === "Spar" || props.gameState.curLoc === "Battle") {
		return (
			<div id="Game-screen">
				<div id="Game-time>"> Time: {props.gameState.time} </div>
				<div id="Game-main">
					{gameSparBattle({ ...props })}
				</div>
				<div id="Game-player">{gamePlayerInfo({ ...props })}</div>
				<div id="Game-dialog">
					System: {props.gameState.dialSysText}
					<br />
					Dialog: {props.gameState.dialCharText}
				</div>
			</div>
		);
	} else {
		return (
			<div id="Game-screen">
				<div id="Game-time>"> Time: {props.gameState.time} </div>
				<div id="Game-main">
					{gameNav({ ...props })}
					{gameChars({ ...props })}
					{gameInteractions({ ...props })}
				</div>
				<div id="Game-player">{gamePlayerInfo({ ...props })}</div>
				<div id="Game-dialog">
					System: {props.gameState.dialSysText}
					<br />
					Dialog: {props.gameState.dialCharText}
				</div>
			</div>
		);
	}
}

export default gameScreen;
