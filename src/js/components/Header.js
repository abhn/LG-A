import React from 'react';

export default class Header extends React.Component {
	constructor() {
		super();
		// React's way to add CSS in state
		this.state = {
			headerProps: {
				paddingTop: '20px',
				paddingBottom: '20px',
				height: '200px'
			},
			boldText: {
				fontWeight: 'bold',
				margin: '0.5em 0 0.2em'
			},
			largeText: {
				fontSize: '1.5em'
			},
			buttonStyle: {
	      borderRadius: '4px',
	      textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
			},
			primButton: {
				background: '#2486e2',
				color: 'white',
			},
			warnButton: {
				background: '#ed8a34',
				color: 'white',
			},
			purpButton: {
				background: '#8c69ad',
				color: 'white',
			},
		}

		this.resetHighscore = this.resetHighscore.bind(this);
	}

	/*
   * Reset the game. This will reload the page.
   */
	reset() {
		location.reload();
	}

	// highscores are recorded in localStorage.
	// clearing localStorage will clear highscores
	resetHighscore() {
		localStorage.clear();
		// forcing update because the state
		// isn't going to trigger a render
		this.forceUpdate();
	}

	/*
	 * Nothing fancy here. Start Game button gets disabled once game starts
	 */
	render() {
		// disable newgame button once game starts
		let newGameBtn;
		if(this.props.elapsedTime !== "00:00") {
			newGameBtn = "pure-button pure-button-disabled";
		}
		else {
			newGameBtn = "pure-button";
		}
		return (
				<div style={this.state.headerProps} class="pure-g">
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<div class="pure-form">
						  <label for="selectTiles">SELECT TILES &#8594;&nbsp;</label>
						  <select id="selectTiles">
								<option>SELECT</option>
								<option value="6">6</option>
						    <option value="8">8</option>
								<option value="10">10</option>
						    <option value="12">12</option>
						  </select>
							<span>&nbsp;&#8594;&nbsp;</span>
							<button class={newGameBtn} style={this.state.buttonStyle, this.state.primButton} onClick={this.props.onClick}>START GAME</button>
							<hr/>
							<button class="pure-button" style={this.state.buttonStyle, this.state.warnButton} onClick={this.reset}>NEW GAME</button>
							&nbsp;
							<button class="pure-button" style={this.state.buttonStyle, this.state.purpButton} onClick={this.resetHighscore}>CLEAR HIGH SCORES</button>
						</div>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={{fontSize: '2em', fontWeight: 'bold'}}>STATS</p>
						<span style={this.state.largeText}>TIME &#8594; {this.props.elapsedTime}</span><br/>
						<span style={this.state.largeText}>MOVES &#8594; {this.props.numMoves}</span>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={{fontSize: '2em', fontWeight: 'bold'}}>HIGH SCORES</p>
						<div class="pure-g">
							<div class="pure-u-1-2">
								<p style={this.state.boldText}>6 TILES &#8594; {localStorage.getItem("highscore6") ? localStorage.getItem("highscore6") : 0} MOVES</p>
								<p style={this.state.boldText}>10 TILES &#8594; {localStorage.getItem("highscore10") ? localStorage.getItem("highscore8") : 0} MOVES</p>

							</div>
							<div class="pure-u-1-2">
								<p style={this.state.boldText}>8 TILES &#8594; {localStorage.getItem("highscore8") ? localStorage.getItem("highscore8") : 0} MOVES</p>

								<p style={this.state.boldText}>12 TILES &#8594; {localStorage.getItem("highscore12") ? localStorage.getItem("highscore8") : 0} MOVES</p>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
