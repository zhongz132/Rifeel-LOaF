/**
 * App.js by zhongz132@gmail.com
 *
 * Holds views for all screens without child components (everything but gameScreen).
 */

import React from "react";
import GameScreen from "./GameScreen.js";

function App(props) {
	return (
		<div>
			<Header
				curScreen={props.screenState.screen}
				ScreenNames={props.Data.ScreenNames}
				switchScreen={props.onSwitchScreen}
				saveGame={props.onSaveGame}
			/>
			<Main {...props} />
		</div>
	);
}

function Header(props) {
	if (props.curScreen === "Game") {
		return (
			// TODO: Save game when press save.
			<div id="App-header">
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.HOME)}>
					{props.ScreenNames.HOME}
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.saveGame()}>
					Save
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.HELP)}>
					{props.ScreenNames.HELP}
				</button>
			</div>
		);
	} else if (props.curScreen === "Help") {
		return (
			<div id="App-header">
				<button className="button-header" onClick={() => props.switchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.GAME)}>
					Resume
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.REPORT)}>
					{props.ScreenNames.REPORT}
				</button>
			</div>
		);
	} else {
		return (
			<div id="App-header">
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.HOME)}>
					{props.ScreenNames.HOME}
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.ABOUT)}>
					{props.ScreenNames.ABOUT}
				</button>{" "}
				<t />
				<button className="button-header" onClick={() => props.switchScreen(props.ScreenNames.REPORT)}>
					{props.ScreenNames.REPORT}
				</button>
			</div>
		);
	}
}

function Main(props) {
	switch (props.screenState.screen) {
		case "Home":
			return <div id="App-main">{homeScreen({ ...props })}</div>;
		case "About":
			return <div id="App-main">{aboutScreen({ ...props })}</div>;
		case "Load":
			return <div id="App-main">{loadScreen({ ...props })}</div>;
		case "Help":
			return <div id="App-main">{helpScreen({ ...props })}</div>;
		case "Report":
			return <div id="App-main">{reportScreen({ ...props }, "")}</div>;
		case "Game":
			return <div id="App-main">{GameScreen({ ...props })}</div>;
		default:
			return (
				<div id="App-main">
					{reportScreen({ ...props }, "Invalid screen: " + props.screenState.screen + ". Please report!")}
				</div>
			);
	}
}

function homeScreen(props) {
	function newGame() {
		props.onNewGame();
		props.onSwitchScreen("Game");
	}

	return (
		<section id="Main-home">
			<h1 id="Home-title">Rifeel</h1>
			<h2>The Life of a Fighter</h2>
			<button className="button-text" onClick={() => newGame()}>
				New Game
			</button>{" "}
			<t />
			<button className="button-text" onClick={() => props.onSwitchScreen("Game")}>
				Resume Game
			</button>{" "}
			<t />
			<button className="button-text" onClick={() => props.onSwitchScreen("Load")}>
				Load Game
			</button>
			<br />
			<br />
			<button className="button-text">Create New Game</button> <t />
			<button className="button-text">Edit Current Game</button> <t />
			<button className="button-text">Load Other Game Version</button>
		</section>
	);
}

function aboutScreen(props) {
	return (
		<section id="Main-about">
			A javascript game written with the help of Flux and React.
			<br />
			Currently, save states are stored in the browser local storage, so clearing it will erase game data.
			<br />
			Written by Zhonghao Zhou
			<br />
			Contact: zhongz132@gmail.com
			<br />
			Code location (SPOILS GAME): https://github.com/zhongz132/Rifeel-LOaF
		</section>
	);
}

function loadScreen(props) {
	var gameVersions = Object.keys(localStorage);
	let gameIds = {};
	for (let key in gameVersions) {
		if (gameVersions[key].substring(0, 12) === "Rifeel-Game-") {
			let version = JSON.parse(localStorage.getItem(gameVersions[key]));
			gameIds[gameVersions[key]] = version.gameName;
		}
	}
	return (
		<section id="Main-home">
			<p>Load Screen</p>
			{Object.keys(gameIds).map(id => (
				<section key={id}>
					<button onClick={() => props.onLoadGame(id)}>{gameIds[id]}</button>
					<br />
				</section>
			))}
		</section>
	);
}

function helpScreen(props) {
	//TODO: THIS!
	return (
		<section id="Main-home">
			<p>Help Screen</p>
			<p>Feature working</p>
		</section>
	);
}

function reportScreen(props, text) {
	let bugsText = "Bugs: https://github.com/zhongz132/Rifeel-LOaF/issues";
	let otherText = 'Other: Email zhongz132@gmail.com with subject: "Rifeel-LOaF: {issue}"';
	if (text.length > 0) {
		return (
			<section id="Main-home">
				<p> Bug: {text} </p>
				<p> {bugsText} </p>
				<p> {otherText} </p>
			</section>
		);
	} else {
		return (
			<section id="Main-home">
				<p> {bugsText} </p>
				<p> {otherText} </p>
			</section>
		);
	}
}

export default App;
