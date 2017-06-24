import React from 'react';
import { Button } from 'react-bootstrap'
import $ from 'jquery';
import FlipCard from 'react-flipcard';
import getData from './Data';

export default class Card extends React.Component {
	constructor() {
		super();

		this.state = {
		};

		this.showBack = this.showBack.bind(this);
		this.showFront = this.showFront.bind(this);
		this.handleOnFlip = this.handleOnFlip.bind(this);
	}

	showBack() {
		this.setState({
			isFlipped: true
		});
	}

	showFront() {
		this.setState({
			isFlipped: false
		});
	}

	handleOnFlip(flipped) {
    if (flipped) {
			let success = this.props.revert(this);
    }
  }

	calcWidth() {
		// because Bootstrap is 12 column!
		return 12 / this.props.desktop;
	}

	render() {
		var cardProps = {
			// backgroundColor: 'grey'
		};
		var flipcardProps = {
			padding: '10px',
		}

		var gameData = '';
		if(this.props.rightAns) {
			gameData = "Right Answer";
		} else {
			gameData = this.props.gameData;
		}

		return (
			<div class={`class col-md-${this.calcWidth()} col-xs-${this.calcWidth() / 2}`} style={cardProps}>
				<FlipCard
						disabled={true}
	          flipped={this.state.isFlipped}
	          onFlip={this.handleOnFlip}>
					<div onClick={this.showBack}><button>Click</button></div>
					<div onClick={this.showFront}>{gameData}</div>
				</FlipCard>
			</div>
		);
	}
}
