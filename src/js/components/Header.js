import React from 'react';

export default class Header extends React.Component {

	render() {
		var headerProps = {
			top: '0',
			height: '10%',
		};
		return (
			<div style={headerProps} class="row">
				<div class="col-md-6">
					<div class="form-group">
					  <label for="selectTiles">Select Tiles</label>
					  <select class="form input-small" id="selectTiles">
							<option value="6">6</option>
					    <option value="8">8</option>
					    <option value="12">12</option>
					  </select>
						<button onClick={this.props.onClick}>Play</button>
					</div>
				</div>
				<div class="col-md-6">
					<div>Time elapsed: <span>{this.props.elapsedTime}</span></div>
					<div>Moves: <span>{this.props.numMoves}</span></div>
				</div>
				<hr/>
			</div>
		);
	}
}
