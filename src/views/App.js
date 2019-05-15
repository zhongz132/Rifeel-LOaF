import React from "react";

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
			<div id="App-header">
				<button id="button-header" onClick={() => props.onSwitchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button id="button-header">LOCATION</button> <t />
				<button id="button-header" onClick={() => props.onSwitchScreen("Help")}>
					Help
				</button>
			</div>
		);
	} else if (props.screenState.screen === "Help") {
		let reportText = "Bugs: https://github.com/zhongz132/Rifeel-LOaF/issues \n";
		reportText += "Other: email zhongz132@gmail.com";
		return (
			<div id="App-header">
				<button id="button-header" onClick={() => props.onSwitchScreen("Home")}>
					Home
				</button>{" "}
				<t />
				<button id="button-header" onClick={() => alert(reportText)}>
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
			<p>Hello!</p>
			<p>Feature working</p>
		</div>
	);
}

function gameScreen(props) {
	return <div id="Game-main" />;
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

function Main(props) {
	if (props.screenState.screen === "Home") {
		return homeScreen({ ...props });
	} else if (props.screenState.screen === "Help") {
		return <div id="App-main">Help Screen!</div>;
	} else if (props.screenState.screen === "About") {
		return aboutScreen(props);
	} else if (props.screenState.screen === "Load") {
		return loadScreen({ ...props });
	} else if (props.screenState.screen === "Game") {
		return gameScreen({ ...props });
	}
}

export default App;
