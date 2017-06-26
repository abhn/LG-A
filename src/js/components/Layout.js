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
			timerHandler: null,
			layoutProps: {
				width: '1170px',
				paddingRight: '15px',
		    paddingLeft: '15px',
		    marginRight: 'auto',
		    marginLeft: 'auto',
			},
			navProps: {
				// background: '#4c4c4c',
			},
			linkProps: {
				// color: '#fff'
			},
		}
		this.play = this.play.bind(this);
		this.moves = this.moves.bind(this);
		this.gameOver = this.gameOver.bind(this);
	}

	/*
   * listener for "Start Game" button.
	 * Sets number of tiles and calls GameCanvas.makeCanvas()
   */
	play() {
		let tiles = $('#selectTiles').val();
		if(tiles === "SELECT") {
			// noting selected
			alert('Please start a new game');
			return;
		}
		this.setState({tiles}, () => {
			// this.gameCanvasInstance.state = {}
			// this.gameCanvasInstance.forceUpdate();
			this.gameCanvasInstance.state.gameStarted = true;
			this.gameCanvasInstance.makeCanvas();
		});
		// update GameCanvas with new tiles number

		// clear existing instance of timer, although that should never happen
		clearInterval(this.state.timerHandler)
		this.state.timerHandler = setInterval(() => {
			let time = this.state.time;
			time++;
			this.setState({
				time:time
			});
		}, 1000);
	}

	/*
   * keep track of the master move count
   */
	moves(val) {
		this.setState({
			numMoves: val
		});
	}

	/*
   * gameOver() keeps track of highscores and stops timer
   */
	gameOver() {
		// stop timer
		clearInterval(this.state.timerHandler);
		// disable more clicks on canvas
		this.gameCanvasInstance.state.gameStarted = false;

		if(localStorage.getItem("highscore" + this.state.tiles)) {
			let curr = localStorage.getItem("highscore" + this.state.tiles);
			if (curr > this.state.numMoves) {
				localStorage.setItem("highscore" + this.state.tiles, this.state.numMoves + 1);
				alert('New high score. Yaay!');
			}
		} else {
			localStorage.setItem("highscore" + this.state.tiles, this.state.numMoves + 1);
			alert('New high score. Yaay!');
		}
	}

	render() {

		let formattedTime = ("0"+Math.floor(this.state.time/60)).slice(-2) + ":" + ("0"+this.state.time%60).slice(-2);
		return (
			<div>
				<div class="pure-menu pure-menu-horizontal" style={this.state.navProps}>
			    <b style={this.state.linkProps} class="pure-menu-heading">Memory Pairs</b>
			    <ul class="pure-menu-list">
		        <li class="pure-menu-item"><a href="https://l-a.me/lg-a/" style={this.state.linkProps} class="pure-menu-link">Demo</a></li>
		        <li class="pure-menu-item"><a href="https://github.com/abhn/LG-A" style={this.state.linkProps} class="pure-menu-link">Source Code</a></li>
		        <li class="pure-menu-item"><a href="https://github.com/abhn/LG-A/blob/master/README.md" style={this.state.linkProps} class="pure-menu-link">Docs</a></li>
			    </ul>
				</div>
				<div style={this.state.layoutProps}>
					<Header onClick={this.play} numMoves={this.state.numMoves} elapsedTime={formattedTime} giveUp={this.giveUp}/>
					<GameCanvas tiles={this.state.tiles} moves={this.moves} gameOver={this.gameOver} ref={gameCanvasInstance => { this.gameCanvasInstance = gameCanvasInstance; }}/>
				</div>
			</div>
		);
	}
}
