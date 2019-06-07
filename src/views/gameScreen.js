/**
 * App.js by zhongz132@gmail.com
 *
 * Holds views for all game locations
 */

import React from "react";
import gamePlayer from "./gamePlayer.js";

function gameScreen(props) {
	return (
		<section id="App-main-game">
			{gameMain(props)}
			{gameDialog(props)}
			{gameNav(props)}
			{gamePlayer(props)}
		</section>
	);
}

function gameMain(props) {
	return (
		<section id="Game-main">
			<section className="Game-part-header">Select an Element to Interact With!</section>
			<section id="Game-main-info">
				<section id="Game-main-elements">Game Elements</section>
				<section id="Game-main-about">Game Elements About</section>
				<section id="Game-main-interactions">Game Elements Interaction</section>
			</section>
		</section>
	);
}

function gameDialog(props) {
	return <section id="Game-dialog">Game Dialog</section>;
}

function gameNav(props) {
	return (
		<section id="Game-nav">
			<section className="Game-part-header">Game Nav Header</section>
			<section id="Game-nav-info">
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
				<br />
				<button className="Game-nav-button">Nav Button</button>
			</section>
			<section id="Game-nav-return">
				<button className="Game-nav-button">RETURN LOCATION</button>
			</section>
		</section>
	);
}

export default gameScreen;
