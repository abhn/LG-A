import React from 'react';

export default class Header extends React.Component {

	render() {
		var headerProps = {
			top: '0',
			height: '10%',
		};
		return (
			<div style={headerProps}>
				<div class="form-group">
				  <label for="selectTiles">Select Tiles</label>
				  <select class="form input-small" id="selectTiles">
						<option value="6">6</option>
				    <option value="8">8</option>
				    <option value="12">12</option>
						<option value="16">16</option>
				  </select>
					<button onClick={this.props.onClick}>Play</button>
				</div>
				<h3>Time elapsed: </h3>
				<h3>Moves: </h3>
				<hr/>
			</div>
		);
	}
}
