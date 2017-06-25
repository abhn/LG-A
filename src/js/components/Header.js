import React from 'react';

export default class Header extends React.Component {

	reset() {
		location.reload();
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
		return (
				<div style={headerProps} class="pure-g">
					<div class="pure-u-1-3">
						<div class="pure-form">
						  <label for="selectTiles">SELECT TILES &#8594; </label>
						  <select id="selectTiles">
								<option>SELECT</option>
								<option value="6">6</option>
						    <option value="8">8</option>
						    <option value="12">12</option>
						  </select>
							&#8594;
							<button class="pure-button pure-button-primary" onClick={this.props.onClick}>PLAY</button>
							<button class="button-warning pure-button" onClick={this.reset}>RESET</button>
						</div>
					</div>
					<div class="pure-u-1-3">
						<p style={boldText}>TIME ELAPSED &#8594; <span style={largeText}>{this.props.elapsedTime}</span></p>
						<p style={boldText}>MOVE COUNT &#8594; <span style={largeText}>{this.props.numMoves}</span></p>
					</div>
					<div class="pure-u-1-3">

					</div>
				</div>
		);
	}
}
