/**
 * App.js by zhongz132@gmail.com
 *
 * Holds views for all screens without child components (everything but gameScreen).
 */

import React from "react";
import gameScreen from "./gameScreen.js";

function App(props) {
	return (
		<div>
			<Header {...props} />
			<Main {...props} />
		</div>
	);
}

function Header(props) {
	if (props.screenState.screen === "Game") {
		return (
			// TODO: If screen is game, change location to location name
			// <button id="button-header">{props.gameState.locData.get(props.gameState.curLoc).name}</button> <t />
			<div id="App-header">
				<button id="button-header" onClick={() => props.onSwitchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button id="button-header">{props.gameState.LocData[props.gameState.curLoc].name}</button> <t />
				<button id="button-header" onClick={() => props.onSwitchScreen("Help")}>
					Help
				</button>
			</div>
		);
	} else if (props.screenState.screen === "Help") {
		return (
			<div id="App-header">
				<button id="button-header" onClick={() => props.onSwitchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button id="button-header" onClick={() => props.onSwitchScreen("Report")}>
					Report
				</button>{" "}
				<t />
				<button id="button-header" onClick={() => props.onSwitchScreen("Game")}>
					Resume
				</button>
			</div>
		);
	} else {
		return (
			<div id="App-header">
				<button id="button-header" onClick={() => props.onSwitchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button id="button-header" onClick={() => props.onSwitchScreen("About")}>
					About
				</button>{" "}
				<t />
				<button id="button-header" onClick={() => props.onSwitchScreen("Help")}>
					Help
				</button>
			</div>
		);
	}
}

function Main(props) {
	switch (props.screenState.screen) {
		case "Home":
			return homeScreen({ ...props });
		case "About":
			return aboutScreen({ ...props });
		case "Load":
			return loadScreen({ ...props });
		case "Help":
			return helpScreen({ ...props });
		case "Report":
			return reportScreen({ ...props }, "");
		case "Game":
			return gameScreen({ ...props });
		default:
			return reportScreen({ ...props }, "Invalid screen: " + props.screenState.screen + ". Please report!");
	}
}

function homeScreen(props) {
	function getNewName() {
		let x = document.getElementById("nameForm");
		let newName = x.elements[0].value;
		props.onChangeName(newName);
	}

	return (
		<div id="Main-home">
			<h1 id="Home-title">Rifeel</h1>
			<h2>The Life of a Follower</h2>
			<button id="button-text" onClick={() => props.onSwitchScreen("Game")}>
				Begin Game
			</button>{" "}
			<t />
			<button id="button-text" onClick={() => props.onSwitchScreen("Game")}>
				Resume Game
			</button>{" "}
			<t />
			<button id="button-text" onClick={() => props.onSwitchScreen("Load")}>
				Load Game
			</button>
			<br />
			<br />
			<form id="nameForm">
				<input type="text" name="fname" />
			</form>
			<button id="button-text" onClick={() => getNewName()}>
				Change Name
			</button>
			<p>Your name: {props.screenState.name}</p>
		</div>
	);
}

function aboutScreen(props) {
	return (
		<div id="Main-about">
			A javascript game written with the help of Flux and React.
			<br />
			Currently, save states are stored in the browser local storage, so clearing it will erase game data.
			<br />
			Written by Zhonghao Zhou
			<br />
			Contact: zhongz132@gmail.com
			<br />
			Code location (SPOILS GAME): https://github.com/zhongz132/Rifeel-LOaF
		</div>
	);
}

function loadScreen(props) {
	//TODO: THIS!
	return (
		<div id="Main-home">
			<p>Load Screen</p>
			<p>Feature working</p>
		</div>
	);
}

function helpScreen(props) {
	//TODO: THIS!
	return (
		<div id="Main-home">
			<p>Help Screen</p>
			<p>Feature working</p>
		</div>
	);
}

function reportScreen(props, text) {
	let bugsText = "Bugs: https://github.com/zhongz132/Rifeel-LOaF/issues";
	let otherText = 'Other: Email zhongz132@gmail.com with subject: "Rifeel-LOaF: {issue}"';
	if (text.length > 0) {
		return (
			<div id="Main-home">
				<p> Bug: {text} </p>
				<p> {bugsText} </p>
				<p> {otherText} </p>
			</div>
		);
	} else {
		return (
			<div id="Main-home">
				<p> {bugsText} </p>
				<p> {otherText} </p>
			</div>
		);
	}
}

export default App;
