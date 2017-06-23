import React from 'react';
import Header from './Header';
import GameCanvas from './GameCanvas';
import $ from 'jquery';

export default class Layout extends React.Component {

	constructor() {
		super();
		this.state = {
			tiles: "8"
		}
		this.play = this.play.bind(this);
	}

	play() {
		let tiles = $('#selectTiles').val();
		this.setState({tiles})
	}

	render() {
		const layoutProps = {
			backgroundColor: 'orange',
		};
		return (
			<div style={layoutProps} class="container">
				<Header onClick={this.play}/>
				<GameCanvas tiles={this.state.tiles}/>
			</div>
		);
	}
}
