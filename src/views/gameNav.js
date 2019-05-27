/**
 * gameNav.js by zhongz132@gmail.com
 *
 * Holds views for the navigation bar.
 */

import React from "react";

// Navigation info
export default function gameNav(props) {
	let curLoc = props.gameState.curLoc;

	let childrenId = props.gameState.LocData[curLoc].children;

	let validChildrenId = childrenId.filter(location => props.gameState.validLoc.includes(location));

	let parent = props.gameState.LocData[curLoc].parent;

	let parentName = "Back";

	if (parent) {
		parentName = props.gameState.LocData[parent].name;
	} else {
		parent = props.gameState.prevLoc;
	}

	function validChildren() {
		return (
			<div id="Game-children">
				<t id="underline">Places</t>
				{validChildrenId.map(childId => (
					<div key={childId}>
						<button className="game-button" onClick={() => props.onDialLocAbout(childId)}>
							{props.gameState.LocData[childId].name}
						</button>
						<br />
					</div>
				))}
			</div>
		);
	}

	function validParent() {
		if (parentName === "Back") {
			return (
				<div id="Game-parent">
					<br />
					<t id="underline">Previous Location</t>
					<br />
					<button className="game-button" onClick={() => props.onDialLocAbout(parent)}>
						{parentName}
					</button>
				</div>
			);
		} else {
			return (
				<div id="Game-parent">
					<br />
					<t id="underline">Exit Location</t>
					<br />
					<button className="game-button" onClick={() => props.onDialLocAbout(parent)}>
						{parentName}
					</button>
				</div>
			);
		}
	}
	if (curLoc !== "Spar" && curLoc !== "Battle") {
		return (
			<div id="Game-nav">
				{validChildren()}
				{validParent()}
			</div>
		);
	} 
}
