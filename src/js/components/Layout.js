import React from 'react';
import Header from './Header';
import GameCanvas from './GameCanvas';
import $ from 'jquery';

export default class Layout extends React.Component {

	constructor() {
		super();
		this.state = {
			tiles: "6",
			numMoves: 0,
			time: 0,
			timerHandler: null
		}
		this.play = this.play.bind(this);
		this.moves = this.moves.bind(this);
		this.gameOver = this.gameOver.bind(this);
	}

	play() {
		let tiles = $('#selectTiles').val();
		if(tiles === "SELECT") {
			// noting selected
			alert('Please first select the tile count');
			return;
		}
		this.setState({tiles}, () => {
			this.gameCanvasInstance.makeCanvas();
		});
		// update GameCanvas with new tiles number

		// clear existing instance of timer
		clearInterval(this.state.timerHandler)
		this.state.timerHandler = setInterval(() => {
			let time = this.state.time;
			time++;
			this.setState({
				time:time
			});
		}, 1000);
	}

	moves(val) {
		console.log(val);
		this.setState({
			numMoves: val
		});
	}

	gameOver() {
		clearInterval(this.state.timerHandler)
		console.log('congrats');
	}

	render() {
		const layoutProps = {
			// style for the page
		};
		let formattedTime = ("0"+Math.floor(this.state.time/60)).slice(-2) + ":" + ("0"+this.state.time%60).slice(-2);
		return (
			<div style={layoutProps} class="container">
				<Header onClick={this.play} numMoves={this.state.numMoves} elapsedTime={formattedTime}/>
				<GameCanvas tiles={this.state.tiles} moves={this.moves} gameOver={this.gameOver} ref={gameCanvasInstance => { this.gameCanvasInstance = gameCanvasInstance; }}/>
			</div>
		);
	}
}
