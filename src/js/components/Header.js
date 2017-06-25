import React from 'react';

export default class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			headerProps: {
				padding: '20px',
				height: '150px'
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
			}
		}
	}

	reset() {
		location.reload();
	}

	resetHighscore() {
		localStorage.clear();
		// forcing update because the state
		// isn't going to trigger a render
		this.forceUpdate();
	}

	render() {


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
							&nbsp;&#8594;&nbsp;
							<button class="pure-button" style={this.state.buttonStyle, this.state.primButton} onClick={this.props.onClick}>START GAME</button>
							<hr/>
							<button class="pure-button" style={this.state.buttonStyle, this.state.warnButton} onClick={this.reset}>RESET</button>
							&nbsp;
							<button class="pure-button" style={this.state.buttonStyle, this.state.purpButton} onClick={this.resetHighscore}>CLEAR LEADERBOARD</button>
						</div>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={this.state.largeText}>GAME STATS</p>
						<p style={this.state.boldText}>TIME ELAPSED &#8594; <span style={this.state.largeText}>{this.props.elapsedTime}</span></p>
						<p style={this.state.boldText}>MOVE COUNT &#8594; <span style={this.state.largeText}>{this.props.numMoves}</span></p>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={this.state.largeText}>LEADERBOARD</p>
						<div class="pure-g">
							<div class="pure-u-1-2">
								<p style={this.state.boldText}>6 MOVES &#8594; {localStorage.getItem("highscore6") ? localStorage.getItem("highscore6") : 0} MOVES</p>
								<p style={this.state.boldText}>10 MOVES &#8594; {localStorage.getItem("highscore10") ? localStorage.getItem("highscore8") : 0} MOVES</p>

							</div>
							<div class="pure-u-1-2">
								<p style={this.state.boldText}>8 MOVES &#8594; {localStorage.getItem("highscore8") ? localStorage.getItem("highscore8") : 0} MOVES</p>

								<p style={this.state.boldText}>12 MOVES &#8594; {localStorage.getItem("highscore12") ? localStorage.getItem("highscore8") : 0} MOVES</p>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
