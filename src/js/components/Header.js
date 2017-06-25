import React from 'react';

export default class Header extends React.Component {

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
		let headerProps = {
			padding: '20px',
			height: '150px'
		};
		let boldText = {
			fontWeight: 'bold',
			margin: '0.5em 0 0.2em'
		}
		let largeText = {
			fontSize: '1.5em'
		}

		let buttonStyle = {
      borderRadius: '4px',
      textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
		}

		let primButton = {
			background: '#2486e2',
			color: 'white',
		}

		let warnButton = {
			background: '#ed8a34',
			color: 'white',
		}

		let purpButton = {
			background: '#8c69ad',
			color: 'white',
		}


		return (
				<div style={headerProps} class="pure-g">
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
							<button class="pure-button" style={buttonStyle, primButton} onClick={this.props.onClick}>START GAME</button>
							<hr/>
							<button class="pure-button" style={buttonStyle, warnButton} onClick={this.reset}>RESET</button>
							&nbsp;
							<button class="pure-button" style={buttonStyle, purpButton} onClick={this.resetHighscore}>CLEAR LEADERBOARD</button>
						</div>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={largeText}>GAME STATS</p>
						<p style={boldText}>TIME ELAPSED &#8594; <span style={largeText}>{this.props.elapsedTime}</span></p>
						<p style={boldText}>MOVE COUNT &#8594; <span style={largeText}>{this.props.numMoves}</span></p>
					</div>
					<div style={{textAlign: 'center'}} class="pure-u-1-3">
						<p style={largeText}>LEADERBOARD</p>
						<div class="pure-g">
							<div class="pure-u-1-2">
								<p style={boldText}>6 MOVES &#8594; {localStorage.getItem("highscore6") ? localStorage.getItem("highscore6") : 0} MOVES</p>
								<p style={boldText}>10 MOVES &#8594; {localStorage.getItem("highscore10") ? localStorage.getItem("highscore8") : 0} MOVES</p>

							</div>
							<div class="pure-u-1-2">
								<p style={boldText}>8 MOVES &#8594; {localStorage.getItem("highscore8") ? localStorage.getItem("highscore8") : 0} MOVES</p>

								<p style={boldText}>12 MOVES &#8594; {localStorage.getItem("highscore12") ? localStorage.getItem("highscore8") : 0} MOVES</p>
							</div>
						</div>

					</div>
				</div>
		);
	}
}
