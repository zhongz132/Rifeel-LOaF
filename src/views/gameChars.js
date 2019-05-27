/**
 * gameChars.js by zhongz132@gmail.com
 *
 * Holds views for the characters.
 */

import React from "react";

// Shows the characters
export default function gameChars(props) {
	let curLoc = props.gameState.curLoc;
	let characters = props.gameState.LocData[curLoc].characters;
	characters = characters.filter(char => props.gameState.validChar.includes(char));
	if (Array.isArray(characters) && characters.length) {
		return (
			<div id="Game-characters">
				<t id="underline">Characters</t>
				{characters.map(charId => (
					<div key={charId}>
						<button className="game-button" onClick={() => props.onDialCharAbout(charId)}>
							{props.gameState.CharData[charId].name}
						</button>
					</div>
				))}
			</div>
		);
	} else {
		return (
			<div id="Game-characters">
				<t id="underline">Characters</t>
				<br />
				There are no characters to interact with.
			</div>
		);
	}
}